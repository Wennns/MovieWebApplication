import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './MovieClassification.css'
import MovieList from '../components/MovieList';
import AddToFavorite from '../components/AddToFavorites';
import '../Urls.js'

const MovieClassification =() => {
  const {id} = useParams();
  // Create a state object to store list of movies.
  const [action_movies, setActionMovies] = useState([]);
  const [adventure_movies, setAdventureMovies] = useState([]);
  const [comedy_movies, setComedyMovies] = useState([]);
  const [drama_movies, setDramaMovies] = useState([]);
  const [history_movies, setHistoryMovies] = useState([]);

  /**
   * getActionMovieRequest: fetch action movie results from api
   */
  const getActionMovieRequest = async() => {
    const url = global.TmdbDiscover + 'with_genres=28';
    const response = await fetch(url);
    const responseJson = await response.json();

    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  global.PosterPath + responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setActionMovies(responseJson.results);
    }
  };

  /**
   * getAdventureMoviesRequest: fetch adventure movie results from api
   */
  const getAdventureMoviesRequest = async() => {
    const url = global.TmdbDiscover + 'with_genres=12';
    const response = await fetch(url);
    const responseJson = await response.json();

    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  global.PosterPath + responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setAdventureMovies(responseJson.results);
    }
  };

  /**
   * getComedyMoviesRequest: fetch Comedy movie results from api
   */
  const getComedyMoviesRequest = async() => {
    const url = global.TmdbDiscover + 'with_genres=35';
    const response = await fetch(url);
    const responseJson = await response.json();

    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  global.PosterPath + responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setComedyMovies(responseJson.results);
    }
  };

  /**
   * getDramaMoviesRequest: fetch drama movie results from api
   */
  const getDramaMoviesRequest = async() => {
    const url = global.TmdbDiscover + 'with_genres=18';
    const response = await fetch(url);
    const responseJson = await response.json();

    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  global.PosterPath + responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setDramaMovies(responseJson.results);
    }
  };

  /**
   * getHistoryMoviesRequest: fetch history movie results from api
   */
  const getHistoryMoviesRequest = async() => {
    const url = global.TmdbDiscover + 'with_genres=36';
    const response = await fetch(url);
    const responseJson = await response.json();

    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  global.PosterPath + responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setHistoryMovies(responseJson.results);
    }
  };

  useEffect(() => {
    getActionMovieRequest();
  }, []);
  useEffect(() => {
    getAdventureMoviesRequest();
  }, []);
  useEffect(() => {
    getComedyMoviesRequest();
  }, []);
  useEffect(() => {
    getDramaMoviesRequest();
  }, []);
  useEffect(() => {
    getHistoryMoviesRequest();
  }, []);

  const logout = () => {
    localStorage.clear();
    alert("logged out");  
    window.location.replace( global.Default + "/login"); //jump back to login page
  }

  const [action, setAction] = useState(0);
  const FnNow = (index) => {
    setAction(index);
  };

  return (
    // frontend
    <div className="MovieGenres">
      <div className="topnav">
        <h1> Movie Application </h1>
        <ul className = "navigation_bar">
          <li><a href={"/login/"+id}>Home Page</a></li>
          <li><a href={"/login/"+id+"/Search_Feature"}>Movie Classification</a></li>
          <li><a href={"/login/"+id+"/Review"}>Write Reviews</a></li>
        </ul>
      </div>
      <div style={{ fontSize: 9, right: 50, top: 10, position: "absolute" }}>
        <button1 onClick={logout}> Log Out</button1>
      </div>


      <h1> Please select the genre of your favorite movie :) </h1>


      <ul className="type_nav">
        <li onClick={() => FnNow(0)}>Select all</li>
        <li onClick={() => FnNow(1)}>Action Movie</li>
        <li onClick={() => FnNow(2)}>Adventure</li>
        <li onClick={() => FnNow(3)}>Comedy</li>
        <li onClick={() => FnNow(4)}>Drama</li>
        <li onClick={() => FnNow(5)}>History</li>
      </ul>
      
      <div style={{ display: action === 1||action === 0 ? "block" : "none" }} >
        <div
          id="Text"
          style={{ fontSize: 30, textAlign: "left", marginLeft: 20 }}
        >
          <h1> Action Movie </h1>
        </div>
        <div id="movies">
          <MovieList movies={action_movies} favoriteComponent={AddToFavorite} />
        </div>
      </div>
      <div style={{ display: action === 2||action === 0 ? "block" : "none" }} >
        <div
          id="Text"
          style={{ fontSize: 30, textAlign: "left", marginLeft: 20 }}
        >
          <h1> Adventure </h1>
        </div>
        <div id="movies">
          <MovieList
            movies={adventure_movies}
            favoriteComponent={AddToFavorite}
          />
        </div>
      </div>

      <div style={{ display: action === 3||action === 0 ? "block" : "none" }} >
        <div
          id="Text"
          style={{ fontSize: 30, textAlign: "left", marginLeft: 20 }}
        >
          <h1> Comedy </h1>
        </div>
        <div id="movies">
          <MovieList movies={comedy_movies} favoriteComponent={AddToFavorite} />
        </div>
      </div>

      <div style={{ display: action === 4||action === 0 ? "block" : "none" }} >
        <div
          id="Text"
          style={{ fontSize: 30, textAlign: "left", marginLeft: 20 }}
        >
          <h1> Drama </h1>
        </div>
        <div id="movies">
          <MovieList movies={drama_movies} favoriteComponent={AddToFavorite} />
        </div>
      </div>

      <div style={{ display: action === 5||action === 0 ? "block" : "none" }} >
        <div
          id="Text"
          style={{ fontSize: 30, textAlign: "left", marginLeft: 20 }}
        >
          <h1> History </h1>
        </div>
        <div id="movies">
          <MovieList
            movies={history_movies}
            favoriteComponent={AddToFavorite}
          />
        </div>
      </div>
    </div>
  );
};
export default MovieClassification;

