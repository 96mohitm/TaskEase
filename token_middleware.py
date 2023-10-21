'''
Middleware for http-only authentication
'''
class TokenAuthMiddleware:
  def __init__(self, get_response):
    self.get_response = get_response

  def __call__(self, request):
    token = request.COOKIES.get('jwt')
    if token:
      request.META['HTTP_AUTHORIZATION'] = f"Bearer {token}"
    response = self.get_response(request)
    return response
