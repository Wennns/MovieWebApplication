import axios from "axios";
import React, { useState} from 'react';
import './SearchFeature.css'
import { useParams } from 'react-router-dom'
import Search from "../components/Search";
import MovieList from '../components/MovieList';
import AddToFavorite from '../components/AddToFavorites';
import "../Urls";
const PersonalSearch=() => {
  // Create a state object to store list of movies and actors.
  //past in parameter for username
  const {id} = useParams();
  const [movieResult,setMovieResult] = useState([]);

  /**
  * searchName: pass in the movie name for searching from the search box
  */
  const searchName=(movie_name) =>{
    getMovieRequest(movie_name);
  }

  /**
  * getMovieRequest: fetch movie information from api
  */
  const getMovieRequest = async (movie_name) => {
    // clear the previous actor result to avoid it remains on display
	const url = global.TMDBDefault + `/search/movie?api_key=8e8f0ff826e86bcf18841bc75193e59b&language=en-US&query=${movie_name}&page=1&include_adult=false`;
    const response = await fetch(url);
		const responseJson = await response.json();
    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["poster_path"] =  global.PosterPath + responseJson.results[i].poster_path;
    }
    if (responseJson.results) {
      setMovieResult(responseJson.results) ;
    }
} 

  /**
   * addFavoriteMovie: connect with backend to add a new favorite movie to list
   */
  const addFavoriteMovie = (movie) => {
      const url = global.BackendDefault + `/users/favorite/`;
      axios.post(url, {
        movie:movie.original_title,
        username:id,
        poster: global.PosterPath + movie.poster_path,
      }).then(function(res){
        console.log(res);
      }).catch(function(res){
        alert(res.message)
      })
  };

  /**
   * backFunc: used by back button to go back to personal page
   */
  const backFunc =() => {
    window.location.replace(global.Default + "/login/" + id);
  }

  /**
   * logOut: used by log out button 
   */
  const logOut =()  => {
    localStorage.clear();
    alert('logged out');
    window.location.replace(global.TmdbDiscover + "/login");
  }

  return(
  <div className='PersonalPage'>
    <div style = {{fontSize:9, right:50, top: 10, position: 'absolute'}}>
      <button1 onClick={logOut}> Log Out</button1>
    </div>
    <div style = {{color:'yellow'}}>
      <h1>Welcome back {id} ;) </h1>
    </div>
    <div style = {{color:'white'}}>
      <Search searchName={searchName}/>
    </div>
    <div>
      <button onClick={backFunc}> Back</button>
    </div>
    <div class = 'movies'>
      <div class = 'row'>
        <MovieList 
            movies = {movieResult} 
            favoriteComponent = {AddToFavorite}
            handleFavoritesClick = {addFavoriteMovie}
        />
      </div>
    </div>
  </div>

  );
}     
export default PersonalSearch;