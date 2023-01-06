import React, { useState, useEffect } from 'react';
import './SearchFeature.css'
import { useParams } from 'react-router-dom'
import Search from "../components/Search";
import SearchActor from '../components/SearchActor';
import MovieList from '../components/MovieList';
import ActorList from '../components/ActorList';
import MovieListOrigin from '../components/MovieListOrigin';
import AddToFavorite from '../components/AddToFavorites';
import "../Urls";

const Search_Feature= () =>{
  const {id} = useParams();
  // Create a state object to store list of movies and actors.
  const [movieResult,setMovieResult] = useState([]);
  const [actorResult,setActorResult] = useState([]);

  /**
   * searchName: pass in the movie name for searching from the search box
   */
  const searchName = (movie_name) =>{
    getMovieRequest(movie_name);
  }

  /**
   * searchActor: pass in the actor name for searching from the search box
   */
  const searchActor = (actor_name) =>{
    getActorRequest(actor_name);
  }

  /**
   * getMovieRequest: fetch movie information according to movie name from api
   */
  const getMovieRequest = async (movie_name) => {
    // clear the previous actor result to avoid it remains on display
    setActorResult([]);
		const url = global.TMDBDefault + `/search/movie?api_key=8e8f0ff826e86bcf18841bc75193e59b&language=en-US&query=${movie_name}&page=1&include_adult=false`;
    // alert(movie_name)
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
   * getActorRequest: fetch action information from api
   */
  const getActorRequest = async (actor_name) => {
    // clear the previous movie result to avoid it remains on display
    setMovieResult([]);
		const url = global.TMDBDefault + `/search/person?api_key=8e8f0ff826e86bcf18841bc75193e59b&language=en-US&query=${actor_name}&page=1&include_adult=false`;
    const response = await fetch(url);
		const responseJson = await response.json();
    // alert(responseJson.results[0]["profile_path"])
    for (var i = 0; i < responseJson.results.length; i++) {
      responseJson.results[i]["profile_path"] = global.PosterPath + responseJson.results[i].profile_path;
    }
    if (responseJson.results) {
      setActorResult(responseJson.results) ;
    }
	}

  /**
   * logOut: used by log out functin
   */
  const logOut = () =>{
    localStorage.clear();
    alert('logged out');
    window.location.replace(global.Default + "/login");
  }


  return(
  <div className='PersonalPage'>
     <div className = "topnav">
        <ul className = "navigation_bar">
          <li><a href={"/login/"+id}>Home Page</a></li>
          <li><a href={"/login/"+id+"/Movie_Classification"}>Movie Classification</a></li>
          <li><a href={"/login/"+id+"/Review"}>Write Reviews</a></li>
        </ul>
      </div>
    <div style = {{fontSize:9, right:50, top: 10, position: 'absolute'}}>
      <button1 onClick={logOut}> Log Out</button1>
    </div>
    <div style = {{color:'yellow'}}>
      <h1>Welcome {id}!</h1>
    </div>
    <div style = {{color:'white'}}>
      <h1>Which movie are you looking for tonight?</h1>
      <Search searchName={searchName}/>
    </div>
    <div style = {{color:'white'}}>
      <h1>Or you can search by actor name</h1>
      <SearchActor searchActor={searchActor}/>
    </div>
    <div class = 'movies'>
      <div class = 'row'>
        <MovieListOrigin movies = {movieResult} />
        <ActorList actors = {actorResult} />
      </div>
    </div>
  </div>

  );
}     
export default Search_Feature;