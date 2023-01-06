import { useParams } from 'react-router-dom'
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Favlist from "../components/FavList";
import RecList from '../components/RecList';
import "../Urls"
// The App component will hold the state for the app. 
// Frontend starts here.
const UserPersonal=() => {
  const {id} = useParams();
  //store the currect fav list
  const [favMovies, setFavMovies] = useState([]);
  //store the movie that needs to be deleted from fav list
  const [movieId, setMovieId] = useState("");
  // store recommendation movies
  const [recMovies, setRecMovies] = useState([]);

  const handleChangeFav = (e)=> {
    setMovieId(e.target.value);
  }
  const handleSubmitFav = (e) => {
    e.preventDefault();
    deleteFav(movieId);
    window.location.reload(false);
} 
  /**
   * getFav: get the curret fav list from backend
   */
  const getFav = async() => {
    await setRecMovies([]);
    axios.get(global.BackendDefault + "/users/favorite/?username="+id).then(response=>{setFavMovies(response.data);getRec(response.data);
    })
  };

  /**
   * getRec: get recommendation movies
   */
  const getRec = async(favMovies) => {
    for (let i = 0; i < favMovies.length; i++) {
      const url = global.TMDBDefault + `/search/movie?api_key=8e8f0ff826e86bcf18841bc75193e59b&language=en-US&query=${favMovies[i].movie_name}&page=1&include_adult=false`;
      const response = await fetch(url);
		  const responseJson = await response.json();
      const url2 = global.TMDBDefault + `/movie/${responseJson.results[0].id}/recommendations?api_key=8e8f0ff826e86bcf18841bc75193e59b&language=en-US&page=1`;
      const response2 = await fetch(url2);
		  const responseJson2 = await response2.json();

      for (let j = 0; j < Math.min(4,responseJson2.results.length); j++) {
        responseJson2.results[j]["poster_path"] = global.PosterPath + responseJson2.results[j].poster_path;
        await setRecMovies(recMovies=>recMovies.concat(responseJson2.results[j]));
      }
    }
  }

  /**
   * deleteFav: delete a fac movie from fav list
   */
  const deleteFav = (movieId) => {
    axios.delete( global.BackendDefault + "/users/favorite/" + movieId)
  };

  useEffect(()=> {
    getFav(); 
  },[]);
  
  

  const logout = () => {
    localStorage.clear();
    alert("logged out");  
    window.location.replace( global.Default + "/login"); //jump back to login page
  }
  return (
      
    <div class = "main page">
        <h1>{id}</h1>
        <ul className = "navigation_bar">
          <li><a href={id+"/Search_Feature"}>Search Feature</a></li>
          <li><a href={id+"/Movie_Classification"}>Movie Classification</a></li>
          <li><a href={id+"/Review"}>Write Reviews</a></li>
        </ul>
      <div className='SearchPopular'>
        <div style = {{fontSize:9, right:50, top: 10, position: 'absolute'}}>
          <button1 onClick={logout}> Log Out</button1>
        </div>
        <div style = {{fontSize:9, right:50, top: 10}}>
          <a href= {global.Default + "/login/" + id + "/Personal_Thoughts"} class = 'button'> Personal Thoughts </a>
        </div> 
        <div style = {{fontSize:9, right:50, top: 10}}>
          <a href= { id +"/Personal_Search"} class = 'button'> Search Movie </a>
        </div> 
        {/* <p><a href="/Movie_Classification" class = 'button'> Movie Classification </a></p> */}
        <div id='Text'> <h1> Favorites </h1> </div>
        <h1>Delete a Favorite Movie</h1>
            <form onSubmit={handleSubmitFav}>
                <input
                type = "text"
                id = "delete"
                placeholder="movie id"
                value = {movieId}
                textAlign={'right'}
                onChange={handleChangeFav}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Submit
                </button>
            </form>
        <div className='row'>
          <Favlist
          favMovies = {favMovies}
        />
        </div> 
      </div>
      <div>
      <h1>Recommendations For U</h1>
      <RecList
        recMovies = {recMovies}
      />
      </div>
    </div>
  )
}

export default UserPersonal;