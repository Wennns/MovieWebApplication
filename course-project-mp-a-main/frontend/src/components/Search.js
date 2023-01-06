import React, { useState } from "react";
/**
 * Search: a component to for movie search box that can be triggered by enter
 */
const Search = (props) => {
  const [movie_name, setName] = useState("");

  // functions for enter trigger
  const handleChange = (e) => {
    if (e.key === 13) {
      props.searchName(movie_name);
      setName("");
    }
    setName(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    props.searchName(movie_name);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="search box"
        className="Search"
        placeholder="Type in movie name"
        name="text"
        autoComplete="off"
        value={movie_name}
        onChange={handleChange}
        style={{ height: "34px", width: "180px" }}
      />
      <button style={{ height: "40px" }}>Search</button>

    </form>
  );
};
export default Search;
