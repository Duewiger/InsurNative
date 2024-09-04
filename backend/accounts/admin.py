from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Document, Registration, UserSettings

CustomUser = get_user_model()

class CustomAdminUser(UserAdmin):
    model = CustomUser
    list_display = [
        "email",
        "first_name",
        "last_name",
        "is_staff",
    ]
    fieldsets = UserAdmin.fieldsets + (
        # For Admins
        (None, {'fields': ('first_name, last_name',)}),
        # For Customers
        ('Customer Info', {'fields': ('salutation', 'birth_date', 'street', 'house_number', 'city', 'postal_code', 'phone_number', 'profile_picture')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        # For Admins
        (None, {'fields': ('first_name, last_name',)}),
        # For Customers
        ('Customer Info', {'fields': ('salutation', 'birth_date', 'street', 'house_number', 'city', 'postal_code', 'phone_number', 'profile_picture')}),
    )
    
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


admin.site.register(CustomUser, CustomAdminUser)
admin.site.register(Document)
admin.site.register(Registration)
admin.site.register(UserSettings)