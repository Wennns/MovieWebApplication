import React, { useState } from "react";
/**
 * a component to for actor search box that can be triggered by enter
 */
const SearchActor = (props) => {
    const [actor_name, setActor] = useState('');

    // functions for enter trigger 
    const handleChange = (e) => {
      if (e.key === 13){
        props.searchActorname(actor_name);
        setActor("");
      }
      setActor(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      props.searchActor(actor_name);
      setActor("");
    }

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search box"
          className="Search"
          placeholder="Type in actor name"
          name="text"
          autoComplete="off"
          value={actor_name}
          onChange={handleChange}
          style={{ height: "34px", width: "180px" }}
        />
        <button style={{ height: "40px" }}> Search </button>
    </form>
    );
}
export default SearchActor;


