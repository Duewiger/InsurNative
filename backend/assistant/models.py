from django.db import models
from accounts.models import CustomUser

class AssistantInteraction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    file = models.FileField(upload_to='user_files/', null=True, blank=True)
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Interaction by {self.user.email} on {self.timestamp}"