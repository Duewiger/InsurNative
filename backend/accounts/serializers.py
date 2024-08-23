from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import CustomUser, Document, Registration, UserSettings, Representative


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'password', 'salutation', 'first_name', 'last_name', 
            'birth_date', 'street', 'house_number', 'city', 'postal_code', 
            'phone_number', 'profile_picture', 'name'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'profile_picture': {'required': False, 'allow_null': True}  # Profilbild ist optional
        }

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if password:
            validated_data['password'] = make_password(password)
        else:
            validated_data.pop('password', None)

        # Entferne das profile_picture-Feld, wenn es leer ist oder None ist
        if 'profile_picture' in validated_data and validated_data['profile_picture'] in [None, '', 'null']:
            validated_data.pop('profile_picture', None)

        return super().update(instance, validated_data)


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'user', 'file']
        read_only_fields = ['user']
        
        
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['user', 'customer_registration', 'registration_date']
        
        
class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ['user', 'language', 'notifications_enabled', 'cookies_enabled']
        read_only_fields = ['user']
        
        
class RepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = ['user', 'name', 'address', 'email', 'phone']
        read_only_fields = ['user']