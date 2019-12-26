from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')


# Password Reset Serializer
class ResetPasswordSerailizer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        users = User.objects.filter(**data)
        if users.exists():
            return users.first()
        raise serializers.ValidationError('Incorrect Email')

#     users = User.objects.filter(email=data.email)
# AttributeError: 'collections.OrderedDict' object has no attribute 'email'
# [25/Dec/2019 15:03:32] "POST /api/auth/reset HTTP/1.1" 500 21127