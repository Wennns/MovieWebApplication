import re
from urllib import response
import requests
import pytest 
from users.models import Movie, PersonalThoughts
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
def test_add_personal_thoughts(movie_test, user_test):  #add personal thoghts to user
    text = "It's good"
    PersonalThoughts.objects.create(movie=movie_test, user_name = user_test.username, movie_name=movie_test.title, username = user_test, review_text = text)
    num_thought = PersonalThoughts.objects.filter(username = user_test).count()
    # favorite.poster_url = poster_url #save the poster url 
    #             favorite.save(update_fields = ['poster_url'])
    
    assert num_thought == 1


@pytest.fixture()
def personal_thought_test(db, movie_test, user_test): #fixture personal thoughts for test delete
    text = "It's good"
    thought =  PersonalThoughts.objects.create(movie=movie_test, user_name = user_test.username, movie_name=movie_test.title, username = user_test, review_text = text)
    return thought


@pytest.mark.django_db
def test_delete_personal_thought(personal_thought_test, user_test): # test delete a personal thoughts from database
    num_thought = PersonalThoughts.objects.filter(username = user_test).count()
    PersonalThoughts.objects.get(id = personal_thought_test.id).delete()
    num_after = PersonalThoughts.objects.filter(username = user_test).count()

    assert num_thought == num_after + 1

def test_api_call_get(): # test api connection for get method
    id = 'User1'
    response = requests.get("http://localhost:8000/users/personal_thoughts/?username=" + id)
    assert response.status_code == 200


def test_api_call_get_no_user(): # test api connection for get method
    response = requests.get("http://localhost:8000/users/personal_thoughts")
    assert response.status_code == 500


def test_api_create(): # test api connection for creating method
    text = "It's good!"
    movie = "Harry Potter 1"
    response = requests.post("http://localhost:8000/users/personal_thoughts/", json = {'username': 'User1', 'movie' : movie, 'review_text': text})
    assert response.status_code == 200

def test_api_update_review():
    text = "It's scary"
    movie = "Harry Potter 1"
    response = requests.post("http://localhost:8000/users/personal_thoughts/", json = {'username': 'User1', 'movie' : movie, 'review_text': text})
    assert response.status_code == 200

def test_api_create_invalid_user():
    text = "It's scary"
    movie = "Harry Potter 1"
    response = requests.post("http://localhost:8000/users/personal_thoughts/", json = {'username': 'User1000', 'movie' : movie, 'review_text': text})
    assert response.status_code == 500

def test_api_call_delete():
    deleteId = str(8)
    response = requests.delete("http://localhost:8000/users/personal_thoughts/"+ deleteId)
    assert response.status_code == 200

def test_api_call_delete_no_id():
    deleteId = str(2)
    response = requests.delete("http://localhost:8000/users/personal_thoughts/"+ deleteId)
    assert response.status_code == 500