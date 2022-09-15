import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

import { createActivity } from "../Redux/actions";

export default function CreateActivity() {
  const allCountries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    season: "summer",
    duration: "45 minutes",
    difficulty: 3,
    countries: ["FJI", "ARG"],
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(createActivity(state));
  };

  console.log(allCountries);

  return (
    <>
      <h1>Create activity</h1>
      <NavBar />
      <SearchBar />

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          min="3"
          max="30"
          placeholder="Rock climbing"
          autoFocus
          onChange={(e) => handleChange(e)}
        />

        <label>Season</label>
        <select name="season" onChange={(e) => handleChange(e)}>
          <option title="summer">Summer</option>
          <option title="fall">Fall</option>
          <option title="winter">Winter</option>
          <option title="spring">Spring</option>
        </select>

        <label>Duration</label>
        <input
          type="text"
          name="duration"
          placeholder="45 minutes"
          onChange={(e) => handleChange(e)}
        />

        <label>Difficulty</label>
        <input
          type="range"
          name="difficulty"
          min="1"
          max="5"
          defaultValue={3}
          onChange={(e) => handleChange(e)}
        />

        <button type="submit">Create activity</button>
      </form>
    </>
  );
}
