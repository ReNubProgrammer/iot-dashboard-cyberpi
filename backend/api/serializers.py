from rest_framework import serializers
from .models import User, Cyberpi

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role', 'number_cyberpi']
        extra_kwargs = {
            'password': {'write_only': True},  # Password won't be included in responses
        }


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure the password isn't returned in the response
        }

    def create(self, validated_data):
        # Use the custom manager's create_user method
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

class CyberpiSerializer(serializers.ModelSerializer):
    registered_by = serializers.SerializerMethodField()  # Convert UUID to Username

    class Meta:
        model = Cyberpi
        fields = ["id", "ip_address", "registered_by", "status"]

    def get_registered_by(self, obj):
        return obj.registered_by.username if obj.registered_by else None