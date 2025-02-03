from django.db import models
from django.contrib.auth import get_user_model
import uuid

# Create your models here.
User = get_user_model()

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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # Auto-incrementing ID
    username = models.CharField(max_length=150, unique=True)  # Unique username
    password = models.CharField(max_length=128)  # Store hashed password
    role = models.CharField(max_length=50, choices=[("admin", "Admin"), ("user", "User")], default="user")
    number_cyberpi = models.IntegerField(default=0)

    objects = CustomUserManager()  # Use the custom manager

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username
    

class CyberpiManager(models.Manager):
    def create_cyberpi(self, ip_address, registered_by, online=False):
        if not ip_address:
            raise ValueError("The ip_address field must be set")
        cyberpi = self.model(
            ip_address=ip_address,
            registered_by=registered_by,
            status=online,
        )
        cyberpi.save(using=self._db)
        return cyberpi
    
class Cyberpi(models.Model):
    id = models.AutoField(primary_key=True)
    ip_address = models.CharField(max_length=150, unique=True)
    registered_by = models.ForeignKey(
        User,  # Reference to the User model
        on_delete=models.CASCADE,
        related_name="cyberpis",
    )
    status = models.CharField(max_length=150, default="offline")

    class Meta:
        db_table = 'cyberpis'

    def __str__(self):
        return self.ip_address
    

