from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('isAuthenticated/', views.is_user_authenticated, name='isAuthenticated'),
    path('profile/', views.user_profile, name='user-profile'),
]
