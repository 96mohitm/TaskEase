from google.auth.transport import requests
from google.oauth2 import id_token
import time

class Google:
    """Google class to fetch the user info and return it"""

    @staticmethod
    def validate(auth_token):
        """
        validate method Queries the Google oAUTH2 api to fetch the user info
        """
        retries = 10
        for attempt in range(retries):
            try:
                idinfo = id_token.verify_oauth2_token(
                    auth_token, requests.Request())

                if 'accounts.google.com' in idinfo['iss']:
                    return idinfo

            except Exception as ex:
                print(f'error while verifying Google token (Attempt {attempt + 1}):', ex)
                
                if attempt == retries - 1:  # If this was the last attempt
                    return "The token is either invalid or has expired"
                time.sleep(1)
