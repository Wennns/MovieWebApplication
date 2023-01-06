import React from 'react';
import './MovieList.css';
/**
 * RecList: Create a movie list of recommendation 
 */
const RecList = (props) =>{
 return (
  <>
   {props.recMovies.map((movie, index) => (
       <div className='image'>
             <div style = {{padding:20, fontSize:20, float:'left', margin: 'auto', height:500, width:350}}>
                <img src={movie.poster_path} alt='movie' width="300" height="400" />
                <a>{movie.original_title}</a> 
            </div>
        </div>
 
    ))}
  </>
 );
};

export default RecList;