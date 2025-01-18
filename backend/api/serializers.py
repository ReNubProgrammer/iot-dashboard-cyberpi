from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
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