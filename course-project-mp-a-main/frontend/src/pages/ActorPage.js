import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import './SearchFeature.css'
import '../Urls'
import MovieListOrigin from '../components/MovieListOrigin';
const ActorPage=() =>{
    // url passing with parameters(the actor's id)
    const {id} = useParams();

    // Create a state object to store list of movies of the actor.
    const [moaResult,setMoaResult] = useState([]);

    /**
     * getMoaRequest: fetch required movie of actor information from api
     */
    const getMoaRequest= async() => {
        const url = global.TMDBDefault + '/person/'+ id +'/movie_credits?api_key=8e8f0ff826e86bcf18841bc75193e59b&language=en-US';
        const response = await fetch(url);
        const responseJson = await response.json();
        for (var i = 0; i < responseJson.cast.length; i++) {
            responseJson.cast[i]["poster_path"] =  global.PosterPath+responseJson.cast[i].poster_path;
        }
        if (responseJson.cast) {
            setMoaResult(responseJson.cast) ;
        }
    };

    useEffect(() => {
        getMoaRequest();
    },[]);
    
    return (
        <div class = 'movies'>
            <div class = 'row'>
                <MovieListOrigin movies = {moaResult} />
             </div>
        </div>
    );
}
export default ActorPage;