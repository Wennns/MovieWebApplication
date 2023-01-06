import axios from 'axios';
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import ReviewBox from '../components/ReviewBox';
import ReviewList from '../components/ReviewList';
import "../Urls";


const Review =() => {
    const {id} = useParams();
    const [result, setResult] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [deleteId, setDeleteId] = useState('');
    
    /**
     * writeReview: write a review 
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
     * handleChangeId: delete a review
     */
    const handleChangeId = (e)=> {
        setDeleteId(e.target.value);
    }
    const handleSubmitId = (e) => {
        e.preventDefault();
        deleteReview(deleteId);
    }
    
    /**
     * submitResult: submit a review
     */
    const submitResult = (review_content) => {
        axios.post(global.BackendDefault + '/users/reviews/', {
            movie:movieName,
            review_text: review_content,
        }). then(function(res) {
            console.log(res);
            window.location.reload(true);
        }).catch(function (res){
            alert(res.message)
        })
    };

    /**
     * getResult: display all review
     */
    const getResult = () => {
        axios.get(global.BackendDefault + '/users/reviews/').then (response => {
            setResult(response.data);
        })
    
    };

    /**
     * deleteReview: delete the review at backend
     */
    const deleteReview = (deleteId) => {
        axios.delete(global.BackendDefault + '/users/reviews/'+ deleteId)
        window.location.reload(true);
    };

    const logout = () => {
        localStorage.clear();
        alert("logged out");  
        window.location.replace( global.Default + "/login"); //jump back to login page
    }

    useEffect(() => {
        getResult();
    },[]);


    return (
        <div style = {{color:'yellow'}}>
             <div className = "topnav">
                <ul className = "navigation_bar">
                <li><a href={"/login/"+id}>Home Page</a></li>
                <li><a href={"/login/"+id+"/Search_Feature"}>Search Feature</a></li>
                <li><a href={"/login/"+id+"/Movie_Classification"}>Movie Classification</a></li>
                </ul>
            </div>
            <div style={{ fontSize: 9, right: 50, top: 10, position: "absolute" ,color: "white"}}>
                <button1 onClick={logout}> Log Out</button1>
            </div>
            <h1>Review Page</h1>
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
export default Review;