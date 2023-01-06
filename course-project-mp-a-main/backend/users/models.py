import imp
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
# Create your models here.

class Movie(models.Model):
    #movie table
    title = models.CharField(max_length=140) 

    def __str__(self):
        return self.title


class Review(models.Model):  # review class
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE
    )
    review_text = models.TextField()
    movie_name = models.CharField(max_length=255, default="Harry Potter 8")
    created_date = models.DateTimeField(auto_now_add=True, editable=False) #automatic created
    updated_date = models.DateTimeField(auto_now=True, editable=False)


class Favorite(models.Model):
    #favorite class, use movie and user as foreign key to connect to the user and movie model
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE
    )
    username = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    movie_name = models.CharField(max_length=255, default="Harry Potter 8")
    user_name = models.CharField(max_length=255, default="Vicky")
    poster_url = models.URLField(max_length=255, default="https://image.tmdb.org/t/p/original")
    created_date = models.DateTimeField(auto_now_add=True, editable=False) #automatic created
    updated_date = models.DateTimeField(auto_now=True, editable=False)


class PersonalThoughts(models.Model):
    #personal thoughts class, use movie and user as foreign key to connect to the user and movie model, the private review for user
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE
    )
    username = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    movie_name = models.CharField(max_length=255, default="Harry Potter 8")
    user_name = models.CharField(max_length=255, default="Vicky")
    review_text = models.TextField()
    # poster_url = models.URLField(max_length=255, default= "https://image.tmdb.org/t/p/original")
    created_date = models.DateTimeField(auto_now_add=True, editable=False) #automatic created
    updated_date = models.DateTimeField(auto_now=True, editable=False)