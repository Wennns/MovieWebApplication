import React from 'react';
/**
 * ReviewList: create review list for movies.
 */
const ReviewList = (props) => {
	return (
		<>
			{props.reviews.map((review, index) => (
				<div>
					<div>
						<p> 
							Review {review.id}:{review.movie_name}:{review.review_text}
						</p>
					</div>
				</div>
			))}
		</>
	);
};
export default ReviewList;
