from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(allow_null=True, required=False)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'avatar')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Pop the avatar from the validated_data
        avatar_data = validated_data.pop('avatar', None)
        
        # Handle password and user creation
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()

        # Handle avatar/profile creation
        UserProfile.objects.create(user=user, avatar=avatar_data)
        
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
