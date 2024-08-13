from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail

from .models import CustomUser, Document
from .serializers import CustomUserSerializer, DocumentSerializer, UserSettingsSerializer


class LoginPageView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Login erfolgreich!"}, status=status.HTTP_200_OK)
        return Response({"error": "Ungültige Benutzerdaten"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutPageView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        logout(request=request)
        return Response({"message": "Logout erfolgreich"}, status=status.HTTP_200_OK)    
        

class ForgotPasswordPageView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = CustomUser.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            reset_url = f"http://example.com/reset-password/{token}/"
            send_mail(
                "Passwort Zurücksetzen",
                f"Nutzen Sie den folgenden Link zum Zurücksetzen Ihres Passworts: {reset_url}",
                "no_reply@duewiger.com",
                [email],
            )
            return Response({"message": "Passwort Zurücksetzen E-Mail gesendet"}, status=status.HTTP_200_OK)
        return Response({"error": "Der Benutzer konnte nicht gefunden werden"}, status=status.HTTP_404_NOT_FOUND)
        
        
class SignupPageView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
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
    
    
class AccountDataDeleteView(generics.DestroyAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    

class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class DocumentDeleteView(generics.DestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Document.objects.get(id=self.kwargs['pk'], user=self.request.user)

        
class UserSettingsView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.settings
        
