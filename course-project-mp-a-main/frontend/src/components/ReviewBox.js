import React, { useState } from "react";
/**
 * ReviewBox: create content box where a user can write review
 */

const ReviewBox = (props) => {
    const [review_content, setContent] = useState('');
    const handleChange = (e) => {
        setContent(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.writeReview(review_content);
        setContent("");
    }
    return (
        <form onSubmit = {handleSubmit}>
            <textarea
                type = "text"
                id = "review box"
                className="Reviewbox"
                placeholder="Write your reviews here"
                name = "text"
                autoComplete="off"
                value = {review_content}
                textAlign={'right'}
                onChange={handleChange}
                style={{width: "370px",height:"300px"}}
            />
            <div>
                <button type="submit" className="btn btn__primary btn__lg">
                    Submit Review
                </button>
            </div>
        </form>
    )
    
}
export default ReviewBox;
