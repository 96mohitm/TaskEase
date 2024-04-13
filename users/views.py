from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

from taskease_api import settings
from .models import UserProfile
from .serializers import GoogleSocialAuthSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import GenericAPIView


@csrf_exempt
@permission_classes((AllowAny, ))
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny, ))
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'Invalid username/password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if not user.check_password(password):
        return Response({'error': 'Invalid username/password'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    response = Response({'message': 'Logged in successfully'})
    response.set_cookie(key='jwt', value=access_token, httponly=True, secure=True)
    
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        try:
            request.user.auth_token.delete()
            response = Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
            response.delete_cookie('auth_token')
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def is_user_authenticated(self):
  return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    profile = user.userprofile
    avatar_url = profile.avatar.url if profile.avatar else None
    if avatar_url and not avatar_url.startswith('http'):
        # prepend the server's domain:
        avatar_url = settings.BASE_URL + avatar_url
    data = {
        "username": user.username,
        "email": user.email,
        "avatar": avatar_url
    }
    return Response(data)

# Google Login
@permission_classes((AllowAny, ))
class GoogleSocialAuthView(GenericAPIView):
    authentication_classes = []

    serializer_class = GoogleSocialAuthSerializer

    def post(self, request):
        """
        POST with "auth_token"
        Send an idtoken as from google to get user information
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        response = Response(data, status=status.HTTP_200_OK)
        response.set_cookie('auth_token', data.get('tokens'), httponly=True, samesite='Lax', secure=True) # 'secure=True' ensures cookie is sent over HTTPS only
        return response

