# course-project-mp-a
## Pitch
Watching movies is one of the most popular ways to relax during leisure time. Our project is a web application that allows users to quickly find the potential interesting movies and their related information using keywords. 

## Introduction
It is a movie web application that consists of movie searching, movie classification, movie recommendation, and movie reviews. Users have their own profile that has favorite movies and reviewed movies. Beside, it requires username, email, and password to login to the personal page. For each movie page, a brief introduction along with actors/actress, release year, actors and rating are presented to the users. On the movie searching page, users can search movies by actor/actress name, or movie name, and these names can be partial keyword. On the movie classification and recommendation page, users can filter the movies by the genre, and our platform will recommend top-rated movies of this selected genre to the users. Besides, users can also add movies they like to favorites lists. On the movie review page, users can upload reviews to a specfic movie.

## Architecture 

### Frontend
- Its role is to contain visual elements that users can see and interact with.
- The frontend component can collect users’ input data, send requests to the backend server and TMDB database, and can receive responses. It can also render the results we want to our users. 
- The language and libraries used to build it are ReactJS, Axios (handle/send HTTP requests to the backend), CSS, HTML, and JavaScript.

### Backend
- Its role is to host and operate our web application. It contains server-side logic, web services, and APIs used by the frontend. It also contains our SQLite database, which stores necessary information.
- The backend part will receive the requests from the frontend, handle requests and send responses back to the frontend.
- The libraries used to build it are mainly Django and Rest Framework. The language is Python.

### TMDB Database
- Its role is to fetch the desired data and images from the TMDB database by TMDB’s APIs, such as the results of searching a movie by its name, genre, and so on.
- There is no interaction between the TMDB database and the backend in our web application. This component only interacts with our front end. This component can receive the requests sent from the frontend and then send responses back to the frontend so that the frontend can visually show the results to users.

![Diagram of Technical Architecture](diagram.png)


## Installation and usage instructions

### Required installations

#### Front End

- Node.js:
    - Install from https://nodejs.org/en/download/
- axios:
    - Install using npm:
```
$ npm install axios
```

#### Back End

- Python3
- Django
```
$ python -m pip install Django
```
- Django-rest framework
```
$ pip install djangorestframework
```
- django-rest-auth
```
$ pip install django-rest-auth
```

### Usage

- To run the front end:
```
$ npm start
```

- To run the back end:
```
$ python manage.py runserver
```

#### Test
- Frontend Test is recorded in a google docs (Link: https://docs.google.com/document/d/1lPhbaQChrVwRTZBx9RAcYHjNkSe3FOiCN1idcfOIqI4/edit)
- Backend Test is implemented by pytest.
    - Install pytest using pip:
    ```
    $ pip install -U pytest
    ```
    
    - Run test:
    ```
    $ pytest
    ```

## Group members and their roles

Tianhui Cai (tianhui2)

- Front End development and design

Xinyi He (xinyihe4)

- Back End development and backend test

Jiaxin Jiang (jiaxinj2)

- UI improvement

Wen Song (wensong2)

- Front End development and frontend test


