# Generated by Django 5.0 on 2024-08-14 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_alter_customuser_first_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="document",
            name="file",
            field=models.FileField(upload_to="user_files"),
        ),
    ]
