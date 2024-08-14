from rest_framework import serializers
from .models import AssistantInteraction


class AssistantInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssistantInteraction
        fields = '__all__'