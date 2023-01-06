import React from 'react';
import './MovieList.css';
/**
 * Favlist: Render Favorite List for movies.
 */
const Favlist = (props) =>{
 return (
  <>
   {props.favMovies.map((movie, index) => (
       <div className='image'>
             <div style = {{padding:30, fontSize:20, float:'left', margin: 'auto', height:500, width:350}}>
                <img src={movie.poster_url} alt='movie' width="300" height="400" />
                <a>{movie.id}:{movie.movie_name}</a> 
            </div>
        </div>
    ))}
  </>
 );
};

export default Favlist;

