from django.db import models

# Create your models here.

# Custom Manager
class CustomUserManager(models.Manager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        user = self.model(username=username, **extra_fields)
        user.password = password
        user.save(using=self._db)
        return user
    

class User(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incrementing ID
    username = models.CharField(max_length=150, unique=True)  # Unique username
    password = models.CharField(max_length=128)  # Store hashed password

    objects = CustomUserManager()  # Use the custom manager

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username