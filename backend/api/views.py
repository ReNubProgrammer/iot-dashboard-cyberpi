from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, permissions
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Cyberpi
from .serializers import UserSerializer, RegisterSerializer, CyberpiSerializer


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
    

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterCyberpiView(APIView):

    def post(self, request):
        ip_address = request.data.get('ip_address')
        registered_by = request.data.get('registered_by') 

        if not ip_address or not registered_by:
            return Response({"error": "IP Address and Registered By are required."}, status=status.HTTP_400_BAD_REQUEST)

        cyberpi = Cyberpi.objects.create(
            ip_address=ip_address,
            registered_by=registered_by,  
            status="offline"
        )
        return Response({"message": "Cyberpi registered successfully."}, status=status.HTTP_201_CREATED)
    

class ListCyberpisView(APIView):

    def get(self, request):
        cyberpis = Cyberpi.objects.all()
        serializer = CyberpiSerializer(cyberpis, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteCyberpiView(APIView):
    def delete(self, request, id, *args, **kwargs):
        try:
            # Find the device by ID
            cyberpi = Cyberpi.objects.get(id=id)
            # Delete the device
            cyberpi.delete()
            return Response({"message": "Device deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Cyberpi.DoesNotExist:
            return Response({"error": "Device not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

