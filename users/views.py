from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken


@csrf_exempt
@permission_classes((AllowAny, ))
@api_view(['POST'])
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
    response = Response()
    response.delete_cookie('jwt')  # Assuming you named your JWT cookie 'jwt'
    response.data = {"message": "Successfully logged out."}
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_user_authenticated(self):
  return Response(status=status.HTTP_200_OK)
