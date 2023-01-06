
import pytest 
import requests
from users.models import Movie, Review


@pytest.fixture()
def movie_test(db): #fixture movie
    movie, created = Movie.objects.get_or_create(title ="Harry Potter")
    return movie

@pytest.mark.django_db  #test related to data base
def test_add_review(movie_test):  #add review to backend
    Review.objects.create(movie=movie_test, review_text = "It's good", movie_name=movie_test.title)
    num_review = Review.objects.all().count()
    print(num_review)
    assert num_review == 1

@pytest.fixture()
def review_test(db): #fixture review for test delete
    movie, created = Movie.objects.get_or_create(title ="Harry Potter")
    review = Review.objects.create(movie=movie, review_text = "It's good", movie_name=movie.title)
    return review


@pytest.mark.django_db
def test_delete_review(review_test): # test delete a review from database
    num_review = Review.objects.all().count()
    Review.objects.get(id = review_test.id).delete()
    num_after = Review.objects.all().count()
    print(num_review)
    assert num_review == num_after + 1

def test_api_call_get(): # test api connection for get method
    response = requests.get("http://localhost:8000/users/reviews")
    assert response.status_code == 200


def test_api_create(): # test api connection for creating method
    text = "It's good!"
    movie = "Harry Potter 1"
    response = requests.post("http://localhost:8000/users/reviews/", json = {'movie' : movie, 'review_text': text })
    assert response.status_code == 200


def test_api_call_delete():
    deleteId = str(5)
    response = requests.delete("http://localhost:8000/users/reviews/"+ deleteId)
    assert response.status_code == 200

def test_api_call_delete_no_id():
    deleteId = str(2)
    response = requests.delete("http://localhost:8000/users/reviews/"+ deleteId)
    assert response.status_code == 500