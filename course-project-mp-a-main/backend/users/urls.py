from django.urls import include, path
from rest_framework import routers
from .views import CreateUserViewset, LoginViewSet, ReviewViewSet, FavoriteViewSet, ThoughtsViewSet


router = routers.DefaultRouter()

#urls for backend api

router.register(r'/register', CreateUserViewset)
router.register(r'/login', LoginViewSet)
router.register(r'/reviews', ReviewViewSet)
router.register(r'/favorite', FavoriteViewSet)
router.register(r'/personal_thoughts', ThoughtsViewSet) 


urlpatterns = [
        path(r'', include(router.urls)),

    ]