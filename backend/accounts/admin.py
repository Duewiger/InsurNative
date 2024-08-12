from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Document, Registration, UserSettings

CustomUser = get_user_model()

class CustomAdminUser(UserAdmin):
    model = CustomUser
    list_display = [
        "email",
        "name",
        "is_staff",
    ]
    fieldsets = UserAdmin.fieldsets + (
        # Für Admins
        (None, {'fields': ('name',)}),
        # Für Kunden
        ('Customer Info', {'fields': ('salutation', 'first_name', 'last_name', 'birth_date', 'street', 'house_number', 'city', 'postal_code', 'phone_number', 'profile_picture')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        # Für Admins
        (None, {'fields': ('name',)}),
        # Für Kunden
        ('Customer Info', {'fields': ('salutation', 'first_name', 'last_name', 'birth_date', 'street', 'house_number', 'city', 'postal_code', 'phone_number', 'profile_picture')}),
    )

# admin.site.register(CustomUser, CustomAdminUser)
admin.site.register(Document)
admin.site.register(Registration)
admin.site.register(UserSettings)