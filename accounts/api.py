from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from knox.models import AuthToken
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ResetPasswordSerailizer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    # same as in Login, so we can easy redirect
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Password reset - Temporary solution
# In the future will be implemented: https://www.django-rest-framework.org/api-guide/authentication/#third-party-packages
class ResetPasswordAPI(generics.GenericAPIView):
    serializer_class = ResetPasswordSerailizer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        subject = '[Lead Manager] Password reset'
        html_message = render_to_string('accounts/password_reset_email.html', {'email': user.email})
        plain_message = strip_tags(html_message)
        from_email = 'Lead Manager <noreply@leadmanagernotrealemail.com>'
        to = [user.email]
        send_mail(subject, plain_message, from_email, to, html_message=html_message, fail_silently=True)
            
        return Response(serializer.data, status=status.HTTP_200_OK)
