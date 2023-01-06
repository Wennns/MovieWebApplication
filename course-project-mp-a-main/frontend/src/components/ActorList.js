import React from 'react';
/**
 * ActorList: take list of actors as an input and display in a new page. Using url with parameters.
 */ 
const ActorList = (props) => {
	return (
		<>
			{props.actors.map((actor, index) => (
				<div className='image'>
					<div style = {{padding:30, fontSize:20, float:'left', margin: 'auto', height:500, width:400}}>
						<img src={actor.profile_path} alt='actor' width="300" height="400"></img>
						<div className = 'actor'><a href = {`Search_Feature/${actor.id}`} style = {{fontSize:30, backgroundColor: '#282c34'}}>
							{actor.name}
						</a> </div>
					</div>
				</div>
			))}
		</>
	);
};

export default ActorList;
