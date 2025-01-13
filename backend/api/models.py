from django.db import models

# Create your models here.

class User(models.Model):
    id = models.CharField(primary_key=True)  # Auto-incrementing ID
    username = models.CharField(max_length=150, unique=True)  # Unique username
    password = models.CharField(max_length=128)  # Store hashed password

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username