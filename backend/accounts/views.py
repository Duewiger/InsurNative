from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.http import FileResponse
from django.db.models import Q
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import logging

from .models import CustomUser, Document, UserSettings, Representative
from .serializers import CustomUserSerializer, DocumentSerializer, RepresentativeSerializer, UserSettingsSerializer

logger = logging.getLogger(__name__)

class LoginPageView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Login erfolgreich!"
            }, status=status.HTTP_200_OK)
        return Response({"error": "Ungültige Benutzerdaten"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutPageView(APIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout erfolgreich"}, status=status.HTTP_200_OK) 
        except Exception as e:
            logger.error(f"Logout error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class ForgotPasswordPageView(APIView):
    serializer_class = CustomUserSerializer
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = CustomUser.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            reset_url = f"http://example.com/reset-password/{user.pk}/{token}/"
            send_mail(
                "Passwort Zurücksetzen",
                f"Nutzen Sie den folgenden Link zum Zurücksetzen Ihres Passwortes: {reset_url}",
                "no_reply@duewiger.com",
                [email],
            )
            return Response({"message": "Passwort Zurücksetzen E-Mail gesendet"}, status=status.HTTP_200_OK)
        return Response({"error": "Der Benutzer konnte nicht gefunden werden"}, status=status.HTTP_404_NOT_FOUND)
        
        
class SignupPageView(APIView):
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        request.data['username'] = request.data.get('email')
        
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountPageView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    

class AccountDataEditView(generics.UpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountDeleteView(generics.DestroyAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            queryset = Document.objects.filter(user=user)
            logger.debug(f"User {user.id} is fetching documents. Total documents: {queryset.count()}")
            for doc in queryset[:5]:
                logger.debug(f"Document ID: {doc.id}, File: {doc.file.name}")
            return queryset
        except Exception as e:
            logger.error(f"Error fetching documents for user {user.id}: {str(e)}")
            return Document.objects.none()

class DocumentSearchView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        query = self.request.query_params.get('q', None)
        try:
            if query:
                queryset = Document.objects.filter(
                    Q(user=user) &
                    (Q(file__icontains=query) | Q(id__icontains=query))
                )
                logger.info(f"Search query '{query}' for user {user.id}: {queryset.count()} results")
            else:
                queryset = Document.objects.filter(user=user)
            return queryset
        except Exception as e:
            logger.error(f"Error searching documents for user {user.id}: {str(e)}")
            return Document.objects.none()

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error listing documents for user {request.user.id}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except Exception as e:
            logger.error(f"Error during document upload: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DocumentDownloadView(generics.RetrieveAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        document = self.get_object()

        if not document.file or not document.file.url:
            return Response({"error": "Datei nicht gefunden"}, status=status.HTTP_404_NOT_FOUND)

        try:
            file_url = document.file.url
            logger.info(f"Download URL: {file_url}")
            response = FileResponse(document.file.open(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{document.file.name.split("/")[-1]}"'
            return response
        except Exception as e:
            logger.error(f"Fehler beim Öffnen der Datei: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DocumentDeleteView(generics.DestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Document, id=self.kwargs['pk'], user=self.request.user)
    
    def delete(self, request, *args, **kwargs):
        try:
            document = self.get_object()
            document.delete()
            logger.info(f"Document {document.id} successfully deleted.")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Error deleting document: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class UserSettingsView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        UserSettings.objects.get_or_create(user=user)
        return user.settings
    

class UserSettingsEditView(generics.UpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.settings

    def update(self, request, *args, **kwargs):
        user_settings = self.get_object()
        serializer = self.get_serializer(user_settings, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class RepresentativePageView(generics.RetrieveAPIView):
    serializer_class = RepresentativeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        Representative.objects.get_or_create(user=user)
        return user.representative
    
    
class RepresentativeEditView(generics.UpdateAPIView):
    serializer_class = RepresentativeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.representative
    
    def update(self, request, *args, **kwargs):
        user_representative = self.get_object()
        serializer = self.get_serializer(user_representative, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RepresentativeEmailView(APIView):
    serializer_class = RepresentativeSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        representative, created = Representative.objects.get_or_create(user=user)

        if not representative.email:
            return Response({"error": "Kein Vertreter oder keine E-Mail-Adresse vorhanden."}, status=status.HTTP_400_BAD_REQUEST)

        message_content = request.data.get('message')
        if not message_content:
            return Response({"error": "Keine Nachricht übermittelt."}, status=status.HTTP_400_BAD_REQUEST)

        message = Mail(
            from_email='service@kasgo.com',
            to_emails=representative.email,
            subject=f'Nachricht von {user.first_name} {user.last_name}',
            html_content=f'<p>{message_content}</p>'
        )

        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(message)
            if response.status_code == 202:
                return Response({"message": "E-Mail erfolgreich gesendet."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Fehler beim Senden der E-Mail."}, status=response.status_code)
        except Exception as e:
            logger.error(f"SendGrid Fehler: {str(e)}")
            return Response({"error": f"Es gab ein Problem beim Senden der E-Mail: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)