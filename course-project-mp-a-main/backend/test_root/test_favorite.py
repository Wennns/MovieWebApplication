import pytest 
import requests
from users.models import Movie, Favorite
from django.contrib.auth.models import User


@pytest.fixture()
def movie_test(db): #fixture movie
    movie, created = Movie.objects.get_or_create(title ="Harry Potter1")
    return movie


@pytest.fixture()
def user_test(db): #fixture
    user = User.objects.create_user('test_user1')
    return user

@pytest.mark.django_db  #test related to data base
def test_add_favorite(movie_test, user_test):  #favorite movie to user
    Favorite.objects.create(movie=movie_test, user_name = user_test.username, movie_name=movie_test.title, username = user_test)
    num_favorite = Favorite.objects.filter(username = user_test).count()
    # favorite.poster_url = poster_url #save the poster url 
    #             favorite.save(update_fields = ['poster_url'])

    assert num_favorite == 1


@pytest.fixture()
def favorite_test(db, movie_test, user_test): #fixture favorite for test delete
    favorite =  Favorite.objects.create(movie=movie_test, user_name = user_test.username, movie_name=movie_test.title, username = user_test)
    return favorite

def test_delete_favorite(favorite_test, user_test): # test delete a favorite from database
    num_favorite = Favorite.objects.filter(username = user_test).count()
    Favorite.objects.get(id = favorite_test.id).delete()
    num_after = Favorite.objects.filter(username = user_test).count()

    assert num_favorite == num_after + 1


def test_api_call_get(user_test): # test api connection for get method
    id = str(user_test.id)
    response = requests.get("http://localhost:8000/users/favorite/?username=" + id)
    assert response.status_code == 200

def test_api_call_get_no_user(): # test api connection for get method
    response = requests.get("http://localhost:8000/users/favorite")
    assert response.status_code == 500



def test_api_create(): #test api call for creating method
    url = "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    response = requests.post("http://localhost:8000/users/favorite/", json = {'username': 'User1', 'movie' : "The Batman", 'poster': url})
    assert response.status_code == 200

def test_api_create_invalid_user():
    url = "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg"

    response = requests.post("http://localhost:8000/users/favorite/", json = {'username': 'User500', 'movie' : "Turning Red", 'poster': url})
    assert response.status_code == 500


def test_api_call_delete():
    deleteId = str(3)
    response = requests.delete("http://localhost:8000/users/favorite/"+ deleteId)
    assert response.status_code == 200

def test_api_call_delete_no_id():
    deleteId = str(500)
    response = requests.delete("http://localhost:8000/users/favorite/"+ deleteId)
    assert response.status_code == 500