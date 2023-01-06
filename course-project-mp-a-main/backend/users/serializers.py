from dataclasses import field, fields
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.exceptions import ObjectDoesNotExist
from .models import Movie, Review, Favorite, PersonalThoughts

class UserSerializer(serializers.ModelSerializer):  # register serializer
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = get_user_model()
        fields = ('username', 'password','password2', 'email', 'first_name', 'last_name')
        
        extra_kwargs = {
            'password': {'write_only': True, 'required': True, 'validators': [validate_password]}
        }

    def validate(self, attrs):  # validate password
        password = attrs.get('password')
        confirm_password = attrs.pop('password2')
        if password != confirm_password:
            raise serializers.ValidationError({"password2": "Password fields didn't match.", "password": "Password fields didn't match."})

        return attrs


    def create(self, validated_data): #register new user
        user = get_user_model()(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user
        

class LoginSerializer(TokenObtainPairSerializer): #log in serializer using JWT

    def validate(self, attrs):
        #validate if the user exists
        data = super().validate(attrs)
        # refresh = self.get_token(self.user)
        data['user'] = UserSerializer(self.user).data
        # data['refresh'] = str(refresh)
        # data['access'] = str(refresh.access_token)

        return data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id','review_text', 'movie', 'movie_name')

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title')

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('id', 'movie', 'movie_name', 'username', 'user_name', 'poster_url')
    

class ThoughtSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalThoughts
        fields = ('id', 'movie', 'movie_name', 'username', 'user_name', 'review_text')