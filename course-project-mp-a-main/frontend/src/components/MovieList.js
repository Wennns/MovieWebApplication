import React from 'react';
import './MovieList.css';
import '../Urls';
/**
 * MovieList: Create MovieList for different genres and search results. 
 */
const MovieList = (props) =>{
 const FavoriteComponent = props.favoriteComponent;
 return (
  <>
   {props.movies.map((movie, index) => (
     <div className='image-container d-flex justify-content-start m-3'>
      <div style = {{padding:40, fontSize:20, float:'left', margin: 'auto', height:900, width:400}}>
       <img src={movie.poster_path} alt='movie' width="300" height="400">
       </img>
       <div
        // take the handleFavoritesClick funtion from props and add it to an onClick property
        onClick={() => props.handleFavoritesClick(movie)}
        className='overlay d-flex align-items-center justify-content-center'
       >
       <FavoriteComponent />
       </div>
       <div><a href = {'https://www.themoviedb.org/movie/'+movie.id} style = {{fontSize:30, backgroundColor: '#282c34'}}>
        {movie.original_title}</a> 
       </div>
       <p> {movie.overview}</p>
       <div id='review'>
        <a href = {'https://www.themoviedb.org/movie/'+movie.id+'/reviews'} style = {{fontFamily: "Times New Roman", fontSize:20, backgroundColor: '#282c34'}}>
        Public Review</a> 
       </div>
      </div>
     </div>
    ))}
  </>
 );
};

export default MovieList;
 