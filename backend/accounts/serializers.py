from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import CustomUser, Document, Registration, UserSettings


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'salutation', 'first_name', 'last_name', 'birth_date', 'street', 'house_number', 'city', 'postal_code', 'phone_number', 'profile_picture', 'name']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }
        
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data=validated_data)
    
    def update(self, instance, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance=instance, validated_data=validated_data)
            

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'user', 'file']
        
        
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['user', 'customer_registration', 'registration_date']
        
        
class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ['user', 'language', 'notifications_enabled', 'cookies_enabled']