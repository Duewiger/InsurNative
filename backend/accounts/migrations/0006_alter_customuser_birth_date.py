# Generated by Django 5.0 on 2024-08-21 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0005_alter_customuser_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="birth_date",
            field=models.CharField(blank=True, default="2024-08-21", max_length=100),
        ),
    ]
