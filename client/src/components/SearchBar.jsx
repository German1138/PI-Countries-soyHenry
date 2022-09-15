import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchCountry } from "../Redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const handleChange = (e) => {
    setState(e.target.value.toLowerCase());
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(searchCountry(state));
  };

  return (
    <form>
      <input
        type="text"
        autoFocus
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>

      <button onClick={(e) => handleClick(e)}>
        <Link to="/home">Search</Link>
      </button>
    </form>
  );
}
