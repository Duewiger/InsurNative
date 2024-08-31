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
            'profile_picture': {'required': False, 'allow_null': True}
        }
        
    def create(self, validated_data):
        password = validated_data.get('password')
        if password:
            validated_data['password'] = make_password(password)
        
        user = CustomUser.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if password:
            validated_data['password'] = make_password(password)
        else:
            validated_data.pop('password', None)

        if 'profile_picture' in validated_data and validated_data['profile_picture'] in [None, '', 'null']:
            validated_data.pop('profile_picture', None)

        return super().update(instance, validated_data)


class DocumentSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ['id', 'user', 'file', 'file_url']
        read_only_fields = ['user']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None
        
        
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