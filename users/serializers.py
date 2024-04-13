from django.contrib.auth.models import User
from rest_framework import serializers

from django.conf import settings

from library.register.register import register_social_user
from .models import UserProfile
from tenacity import retry, stop_after_attempt, wait_fixed
from library.sociallib import google
from rest_framework.exceptions import AuthenticationFailed

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

@retry(stop=stop_after_attempt(3), wait=wait_fixed(1))  # tries up to 3 times, waits 1 second between retries
def fetch_user_data(auth_token):
  return google.Google.validate(auth_token)

class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        # time.sleep(3)
        user_data = fetch_user_data(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )
        print(user_data['aud'])
        if user_data['aud'] != settings.GOOGLE_CLIENT_ID:

            raise AuthenticationFailed('oops, who are you?')

        user_id = user_data.get('sub', "")
        email = user_data.get('email', "")
        name = user_data.get('name', None)
        provider = 'google'
        profile_picture = user_data.get('picture', None)
        first_name = user_data.get('given_name', None)
        last_name = user_data.get('family_name', None)

        return register_social_user(
            provider=provider, user_id=user_id, email=email, name=name,
            profile_picture=profile_picture, first_name=first_name, last_name=last_name)
