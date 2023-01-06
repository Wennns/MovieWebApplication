import './App.css';
import React, { useState, useEffect } from 'react';
import MovieList from '../src/components/MovieList';
import AddToFavorite from './components/AddToFavorites';
/**
 * The App component will hold the state for the app. 
 * Frontend starts here.
 */
const App = () => {
  const [movies, setMovies] = useState([]);
  // create a state object to hold list of favorites movies
  const [favorites, setFavorites] = useState([]);

  /**
   * getMovieRequest: fetch the most popular movies from the API
   */ 
  const getMovieRequest = async() => {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=8e8f0ff826e86bcf18841bc75193e59b';
    const response = await fetch(url);
    const responseJson = await response.json();
    
    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  "https://image.tmdb.org/t/p/original"+responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  /**
   * addFavoriteMovie: Accept a movie and add this movie to the list.
   */ 
  const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
	};

  /**
   * useEffect: useEffect to show movie list
   */ 
  useEffect(() => {
    getMovieRequest();
  },[]);

  const logout = () => {
    localStorage.clear();
    alert("logged out");  
    window.location.replace("http://localhost:3000/login"); //jump back to login page
  }
  return (
    <div className = "main page">
      <div className = "topnav">
        <h1> Movie Application </h1>
        <ul className = "navigation_bar">
         <li><a href="/register">Register</a></li> 
          <li><a href="/login">Login</a></li>
          <li><a href="/">Home Page</a></li>
          <li><a href="/Search_Feature">Search Feature</a></li>
          <li><a href="/Movie_Classification">Movie Classification</a></li>
          <li><a href="/Review">Write Reviews</a></li>
        </ul>
      </div>
      <div className='SearchPopular'>
        <div style = {{fontSize:9, right:50, top: 10, position: 'absolute'}}>
          <button1 onClick={logout}> Log Out</button1>
        </div>
        <div id = 'Text'>
          <h1> Top 20 most popular movies: </h1>
        </div>
        <div id = 'popular_movies'>
          <MovieList 
            movies = {movies} 
            favoriteComponent = {AddToFavorite}
            handleFavoritesClick = {addFavoriteMovie}
          />
        </div>
      </div>
    </div>
  )
}

export default App;