import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReviewBox from '../components/ReviewBox';
import ReviewList from '../components/ReviewList';
import "../Urls";
import { useParams } from 'react-router-dom'

const PersonalThoughts =() => {
    const {id} = useParams();
    const [result, setResult] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [deleteId, setDeleteId] = useState('');
    
    /**
     * writeReview: write a personal thought
     */
    const writeReview = async(review_content) => {
        submitResult(review_content);
    }

    const handleChange = (e)=> {
        setMovieName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setMovieName(movieName);
    }


    /**
     * handleChangeId: delete a personal thought
     */
    const handleChangeId = (e)=> {
        setDeleteId(e.target.value);
    }
    const handleSubmitId = (e) => {
        e.preventDefault();
        deleteReview(deleteId);
    }
    
    /**
     * submitResult: submit a personal thought to the backend
     */
    const submitResult = (review_content) => {
        const url = global.BackendDefault + `/users/personal_thoughts/`;
        axios.post(url, {
            movie: movieName,
            review_text: review_content,
            username:id,
        }). then(function(res) {
            console.log(res);
            window.location.reload(true);
        }).catch(function (res){
            alert(res.message)
        })
    };

    /**
     * getResult: get all the personal thoughts from the backend
     */
    const getResult = () => {
        axios.get(global.BackendDefault + '/users/personal_thoughts/?username='+id).then (response => {
            setResult(response.data);
        })
    
    };

    /**
     * deleteReview: send request to delete a personal thoughts at backend
     */
    const deleteReview = (deleteId) => {
        axios.delete(global.BackendDefault + '/users/personal_thoughts/'+ deleteId)
        window.location.reload(true);
    };

    useEffect(() => {
        getResult();
    },[]);


    return (
        <div style = {{color:'yellow'}}>
            <h1>{id}, feel free to write down your Personal Thoughts.</h1>
            <p>Unlike reviews, your thoughts here will not be seen by others!</p>
            <form onSubmit={handleSubmit}>
                <input
                type = "text"
                id = "movie_box"
                placeholder="Movie Name"
                value = {movieName}
                textAlign={'right'}
                onChange={handleChange}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Submit
                </button>
            </form>
            <ReviewBox writeReview = {writeReview}/>
            <h1>Previous Reviews</h1>
            <ReviewList reviews = {result}/>

            <h1>Delete a Review</h1>
            <form onSubmit={handleSubmitId}>
                <input
                type = "text"
                id = "delete"
                placeholder="review id"
                value = {deleteId}
                textAlign={'right'}
                onChange={handleChangeId}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Submit
                </button>
            </form>
        </div>     
    );
}
export default PersonalThoughts;