import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

import { createActivity, getCountries } from "../Redux/actions";

export default function CreateActivity() {
  const allCountries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [state, setState] = useState({
    name: "",
    season: "summer",
    duration: "",
    difficulty: 3,
    countries: [],
  });

  const [dur, setDur] = useState([23, "minutes"]);

  const handleDuration = (e) => {
    if (e.target.name === "durationA") dur.splice(0, 1, e.target.value);
    if (e.target.name === "durationB") dur.splice(1, 1, e.target.value);
    setState({ ...state, duration: dur.join(" ") });
    console.log(dur);
  };

  const handleChange = (e) => {
    if (e.target.name === "countries") {
      let updatedList = [...state.countries];
      if (e.target.checked) {
        updatedList = [...state.countries, e.target.value];
      } else {
        updatedList.splice(state.countries.indexOf(e.target.value), 1);
      }
      setState({ ...state, countries: updatedList });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setState({ ...state, countries: checked });
    //console.table(checked);
    console.table(state);
    //dispatch(createActivity(state));
  };

  return (
    <>
      <h1>Create activity</h1>

      <NavBar />
      <SearchBar />

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h3>Activity Name</h3>
          <input
            type="text"
            name="name"
            min="3"
            max="30"
            placeholder="Rock climbing"
            autoFocus
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <h3>Season</h3>
          <select name="season" onChange={(e) => handleChange(e)}>
            <option title="summer">Summer</option>
            <option title="fall">Fall</option>
            <option title="winter">Winter</option>
            <option title="spring">Spring</option>
          </select>
        </div>

        <div>
          <h3>Duration</h3>
          <input
            type="number"
            id="duration"
            name="durationA"
            min="1"
            max="60"
            onChange={(e) => handleDuration(e)}
          />
          <select
            id="duration"
            name="durationB"
            onChange={(e) => handleDuration(e)}
          >
            <option>minutes</option>
            <option>hours</option>
            <option>days</option>
            <option>weeks</option>
          </select>
        </div>

        <div>
          <h3>Difficulty</h3>
          <input
            type="range"
            name="difficulty"
            min="1"
            max="5"
            defaultValue={3}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <h3>Countries</h3>
          {allCountries && allCountries.length
            ? allCountries.map((el, index) => {
                return (
                  <div key={index}>
                    <input
                      value={el.id}
                      type="checkbox"
                      name="countries"
                      onChange={(e) => handleChange(e)}
                    />
                    <span>{el.name}</span>
                  </div>
                );
              })
            : "There is no countries"}
        </div>

        <button type="submit">Create activity</button>
      </form>
    </>
  );
}
