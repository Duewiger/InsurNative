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

from .models import CustomUser, Document, UserSettings
from .serializers import CustomUserSerializer, DocumentSerializer, UserSettingsSerializer


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
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        print(f"Authorization Header: {request.headers.get('Authorization')}")
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)
        print(f"Received Refresh Token: {refresh_token}")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout erfolgreich"}, status=status.HTTP_200_OK) 
        except Exception as e:
            print(f"Logout error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class ForgotPasswordPageView(APIView):
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
        
        print(self.request.data)
        
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
        return Response({"detail": "Ihr Konto wurde erfolgreich gelöscht."}, status=status.HTTP_204_NO_CONTENT)


class DocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)


class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print("User:", self.request.user)
        serializer.save(user=self.request.user)
        

class DocumentDownloadView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    # lookup_field = 'id'

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        document = self.get_object()
        if not document.file or not document.file.path:
            return Response({"error": "Datei nicht gefunden"}, status=status.HTTP_404_NOT_FOUND)
        response = FileResponse(document.file.open(), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{document.file.name.split("/")[-1]}"'
        return response


class DocumentDeleteView(generics.DestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Präzisere Fehlerbehandlung bei der Abfrage
        return get_object_or_404(Document, id=self.kwargs['pk'], user=self.request.user)
    

class DocumentSearchView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        query = self.request.query_params.get('q', None)
        if query:
            return Document.objects.filter(
                Q(user=user) &
                (Q(file__icontains=query) | Q(id__icontains=query))
            )
        return Document.objects.filter(user=user.id)

        
class UserSettingsView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Erstellt die UserSettings, falls sie nicht existieren
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