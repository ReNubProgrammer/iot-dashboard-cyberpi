"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import LoginView, UsersView, RegisterView, RegisterCyberpiView, ListCyberpisView, DeleteCyberpiView, DeleteUserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UsersView.as_view(), name='users'),
    path('register/', RegisterView.as_view(), name='register'),
    path('register_cyberpi/', RegisterCyberpiView.as_view(), name='register-cyberpi'),
    path('cyberpis/', ListCyberpisView.as_view(), name='list-cyberpis'),
    path('delete_cyberpi/<int:id>/', DeleteCyberpiView.as_view(), name='delete_cyberpi'),
    path('users/<uuid:user_id>/delete/', DeleteUserView.as_view(), name='delete_user'),
]
