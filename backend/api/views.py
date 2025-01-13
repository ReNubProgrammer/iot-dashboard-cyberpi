from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from .serializers import UserSerializer


# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            # Check if the user exists
            user = User.objects.get(username=username)
            # Validate password
            if password == user.password:
                return Response({"message": "Login successful", "user_id": user.id}, status=200)
            else:
                return Response({"error": "Invalid credentials"}, status=401)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
class UsersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = User.objects.all()  # Retrieve all users
        serializer = UserSerializer(users, many=True)  # Serialize all users
        return Response(serializer.data)  # Return the serialized data
