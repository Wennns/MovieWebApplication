from urllib import response
from django.shortcuts import render
from .serializers import UserSerializer, User, LoginSerializer, Movie, MovieSerializer,Review, ReviewSerializer, Favorite, FavoriteSerializer, PersonalThoughts, ThoughtSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken


class LoginViewSet(ModelViewSet):  
    # user login review
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()

    def create(self, request):
        #return the user if exists, if not return error
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.data, status=status.HTTP_200_OK)

# Create your views here.
class CreateUserViewset(ModelViewSet):
    #register view class, create new user
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    @action(methods = ['POST'], detail = True)
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
            "user": serializer.data,
            "message": "User Created Successfully",
        }, status=status.HTTP_201_CREATED)
        else:
            return Response({
            "error": serializer.data,
            "message": "fail to register"
        }, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(ModelViewSet):
    # public view class
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # authentication_classes = (TokenAuthentication, ) 
    # permission_classes = (IsAuthenticated, ) 

    def list(self, request):
        #return all review to front end
        queryset = Review.objects.all()
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        #remove the review by id, if there is no such reivew, do nothing
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_404_NOT_FOUND:
            pass
        queryset = Review.objects.all()
        serializer = ReviewSerializer(queryset, many=True)
        response = {'message': 'review created', 'result': serializer.data}
        return Response(response)

    # @action(methods = ['POST'], detail = True)
    def create(self, request):
        #create a new review in backend, and link the reivew to the movie in movie table
        if 'review_text' in request.data:
            movie, created = Movie.objects.get_or_create(title = request.data['movie'])
            comment = request.data['review_text']
            name = request.data['movie']
            review = Review.objects.create(movie=movie, review_text = comment, movie_name=name)
            serializer = ReviewSerializer(review, many=False)
            response = {'message': 'review created', 'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)

        else:
            # if there is no review text provided, return error message
            response = {'message': 'you need to provide review'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class FavoriteViewSet(ModelViewSet):
    #class for favorite
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

    def list(self, request):
        #return the favorites under the user
        queryset = Favorite.objects.filter(user_name = request.GET['username'])  #select based on user name
        serializer = FavoriteSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        #remove the favorite movie by id
        # username = request.data['username']
        # name = request.data['movie']
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_404_NOT_FOUND: #if the id does not exists, quit
            pass
        response = {'message': 'favorite deleted'}
        return Response(response)

    # @action(methods = ['POST'], detail = True)
    def create(self, request):
        #create a new favorite in backend, and link the to the movie table and user table
        if 'username' in request.data and 'movie' in request.data:  #check if the movie name and user are provided
            movie, created = Movie.objects.get_or_create(title = request.data['movie']) #if movie exits
            username = request.data['username']
            name = request.data['movie']
            user = User.objects.get(username = username)
            poster_url = request.data['poster']
      
            try:  # if the user does not exits, report error
                favorite, created = Favorite.objects.get_or_create(movie=movie, user_name = username, movie_name=name, username = user) #
                favorite.poster_url = poster_url #save the poster url 
                favorite.save(update_fields = ['poster_url'])
                serializer = FavoriteSerializer(favorite, many=False)
                response = {'message': 'favorite added', 'result': serializer.data}  #return the saved favorite
                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'message': 'user does not exits'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        else:
            # if there is no review text provided, return error message
            response = {'message': 'you need to provide username and movie name'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ThoughtsViewSet(ModelViewSet):
    #class for personal thought
    queryset = PersonalThoughts.objects.all()
    serializer_class = ThoughtSerializer

    def list(self, request):
        #return the personal review under the user
        queryset = PersonalThoughts.objects.filter(user_name = request.GET['username'])  #select based on user name
        serializer = ThoughtSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        #remove the personal thoughts by id
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_404_NOT_FOUND: #if the id does not exists, quit
            pass
        response = {'message': 'thoughts deleted'}
        return Response(response)

    # @action(methods = ['POST'], detail = True)
    def create(self, request):
        #create a new review in backend, and link the to the movie table and user table
        if 'username' in request.data and 'movie' in request.data:  #check if the movie name and user are provided
            movie, created = Movie.objects.get_or_create(title = request.data['movie']) #if movie exits
            username = request.data['username']
            name = request.data['movie']
            user = User.objects.get(username = username)
            review_text = request.data['review_text']
      
            try:  # if the user does not exits, report error
                personal_thought, created = PersonalThoughts.objects.get_or_create(movie=movie, user_name = username, movie_name=name, username = user) #
                personal_thought.review_text = review_text #save the poster url 
                personal_thought.save(update_fields = ['review_text'])
                serializer = ThoughtSerializer(personal_thought, many=False)
                response = {'message': 'personal thoughts added', 'result': serializer.data}  #return the saved favorite
                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'message': 'user does not exits'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        else:
            # if there is no review text provided, return error message
            response = {'message': 'you need to provide username and movie name'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    
