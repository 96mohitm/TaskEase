from rest_framework.authtoken.models import Token
# from library.notification.email import send_email_via_mailersend, send_welcome_email

from users.models import UserProfile
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone


def register_social_user(provider, user_id, email, name, first_name=None, last_name=None, profile_picture=""):
    filtered_user_by_email = UserProfile.objects.filter(email=email)

    if filtered_user_by_email.exists():
        if provider == filtered_user_by_email[0].auth_provider:
            # updating filtered_user
            attrs_to_update = {
                'last_login': timezone.now(),
                'first_name': first_name,
                'last_name': last_name,
                'full_name': name,
                'profile_picture': profile_picture,
            }

            filtered_user_by_email.update(**attrs_to_update)
            new_user = UserProfile.objects.get(email=email)

            registered_user = UserProfile.objects.get(email=email)
            registered_user.check_password(settings.SOCIAL_SECRET)

            Token.objects.filter(user=registered_user).delete()
            Token.objects.create(user=registered_user)
            new_token = list(Token.objects.filter(
                user_id=registered_user).values("key"))

            return {
                'username': registered_user.username,
                'email': registered_user.email,
                'tokens': str(new_token[0]['key']),
                'profile_picture': profile_picture,
            }

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
        user = {
            'username': email,
            'email': email,
            'password': settings.SOCIAL_SECRET,
            'last_login': timezone.now(),
            'first_name': first_name,
            'last_name': last_name if last_name else "",
            'profile_picture': profile_picture,
        }
        user = UserProfile.objects.create_user(**user)
        user.is_active = True
        user.auth_provider = provider
        user.save()
        # send_welcome_email(email=email, first_name=first_name, full_name=name)
        new_user = UserProfile.objects.get(email=email)
        new_user.check_password(settings.SOCIAL_SECRET)
        Token.objects.create(user=new_user)
        new_token = list(Token.objects.filter(user_id=new_user).values("key"))
        return {
            'email': new_user.email,
            'username': new_user.username,
            'tokens': str(new_token[0]['key']),
            'profile_picture': profile_picture,
        }
