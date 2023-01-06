import imp
from operator import imod
from urllib import response
import pytest 
from django.contrib.auth.models import User
import django.test.client as client
import requests

@pytest.mark.django_db  #test related to data base
def test_user_registration():  #test user registration
    User.objects.create_user('test', 'qazwsx1230')
    num_user = User.objects.all().count()
    print(num_user)
    assert num_user == 1

@pytest.fixture()
def user_test(db): #fixture
    user = User.objects.create_user('test_user')
    return user


@pytest.mark.django_db 
def test_user_check_password(user_test): #test user password set the same
    user_test.set_password("qazwsx1230")
    assert user_test.check_password("qazwsx1230") is True

def test_api_register():
    username = "User3"
    password = 'qazwsx1230'
    password2 = 'qazwsx1230'
          
    response = requests.post("http://localhost:8000/users/register/", json = {'username': username, 'password': password, 'password2': password2, 'email': "",
          'first_name': '',
          'last_name': ""})
    assert response.status_code == 201


def test_api_register_existing_username():
    username = "User1"
    password = 'qazwsx1230'
    password2 = 'qazwsx1230'
          
    response = requests.post("http://localhost:8000/users/register/", json = {'username': username, 'password': password, 'password2': password2, 'email': "",
          'first_name': '',
          'last_name': ""})
    assert response.status_code == 400


def test_api_register_simple_password():
    username = "User500"
    password = '12345678'
    password2 = '12345678'
          
    response = requests.post("http://localhost:8000/users/register/", json = {'username': username, 'password': password, 'password2': password2, 'email': "",
          'first_name': '',
          'last_name': ""})
    assert response.status_code == 400

def test_api_login():
    response = requests.post('http://localhost:8000/api/token/', json = {"username": 'User2', "password" : "qazwsx1230"})
    assert response.status_code == 200

def test_api_login_no_username():
    username = "User100"
    password = 'qazwsx1230'
    response = requests.post('http://localhost:8000/api/token/', json = {"username": username, "password" : password})
    assert response.status_code == 401

def test_api_login_incorrect_password():
    username = "User1"
    password = 'qazwsx1234'
    response = requests.post('http://localhost:8000/api/token/', json = {"username": username, "password" : password})
    assert response.status_code == 401
