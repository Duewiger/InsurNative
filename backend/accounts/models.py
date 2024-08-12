import json
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, Permission
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    ### Customers ###
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    salutation = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    street = models.CharField(max_length=100, null=True, blank=True)
    house_number = models.CharField(max_length=20, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True, blank=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    
    ### ADMINS ###
    name = models.CharField(null=True, blank=True, max_length=250)
    
    def __str__(self):
        return f"{self.first_name, self.last_name}"
    
    def get_absolute_url(self):
        return reverse("account_data_edit", kwargs={'id': self.id})
    
    
class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    file = models.FileField(upload_to="user_documents")
    
    
class Registration(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='registration')
    customer_registration = models.TextField(default='{}')
    registration_date = models.DateTimeField(default=timezone.now)
    
# Django Signals zum automatischen Setzen der Permissions bei User Creation
@receiver(post_save, sender=CustomUser)
def user_created(sender, instance, created, **kwargs):
    if created:
        # Erstelle die Registrierungsdaten
        data = {
            'id': str(instance.id),
            'first_name': instance.first_name,
            'last_name': instance.last_name
        }

        # Erstelle und speichere den Registrierungseintrag
        Registration.objects.create(
            user=instance,
            customer_registration=json.dumps(data)
        )
    

class UserSettings(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='settings')
    language = models.CharField(max_length=50, null=True, blank=True)
    notifications_enabled = models.BooleanField(default=True)
    cookies_enabled = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username}'s settings"
    
