from django.contrib.auth.models import AbstractUser
from django.db import models

class UserProfile(AbstractUser):
  # user = models.OneToOneField(User, on_delete=models.CASCADE)
  avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
  email = models.EmailField(unique=True)
  full_name = models.CharField(max_length=255, null=True, blank=True)
  profile_picture = models.URLField(max_length=500, null=True, blank=True)

  auth_provider = models.CharField(max_length=50, blank=True, default='email')
