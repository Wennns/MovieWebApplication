from django.contrib import admin

# Register your models here.
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Movie, Review, Favorite, PersonalThoughts

admin.site.register(Movie)
admin.site.register(Review)
admin.site.register(Favorite)
admin.site.register(PersonalThoughts)

