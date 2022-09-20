import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

import { createActivity, getCountries } from "../Redux/actions";

import s from "./CreateActivity.module.css";

export default function CreateActivity() {
  const allCountries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries({ sort: "asc", filter: "" }));
  }, []);

  const [state, setState] = useState({
    name: "",
    season: "summer",
    duration: "",
    difficulty: 3,
    countries: [],
  });

  const [dur, setDur] = useState([, "minutes"]);

  const handleDuration = (e) => {
    if (e.target.name === "durationA") dur.splice(0, 1, e.target.value);
    if (e.target.name === "durationB") dur.splice(1, 1, e.target.value);
    setState({ ...state, duration: dur.join(" ") });
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
    console.log(errors);
    if (!Object.keys(errors).length) {
      console.table(errors);
      console.table(state);
      window.alert("Activity created!");
      //dispatch(createActivity(state))
      //e.target.reset();
    } else {
      window.alert("Error! Invalid values");
    }
  };

  useEffect(() => {
    setErrors(validationJS(state, dur));
  }, [state, dur]);

  const [errors, setErrors] = useState({});
  const pattern = RegExp(/^[a-z ,.'-]+$/i);

  const validationJS = (state, dur) => {
    const errors = {};

    if (!state.name) errors.name = "Name is required!";
    if (
      state.name.length < 3 ||
      state.name.length > 10 ||
      !pattern.test(state.name)
    )
      errors.name = "Invalid name!";

    if (!dur[0]) errors.duration = "Duration is required!";
    if (dur[0] <= 0) errors.duration = "Invalid duration!";
    if (
      (dur[0] > 60 && dur[1] === "minutes") ||
      (dur[0] > 23 && dur[1] === "hours") ||
      (dur[0] > 60 && dur[1] === "days") ||
      (dur[0] > 8 && dur[1] === "weeks")
    )
      errors.duration = "Invalid duration!";

    if (state.countries.length === 0)
      errors.countries = "Check at least one country!";

    console.log(errors);
    return errors;
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
            placeholder="Rock climbing"
            autoFocus
            className={errors.name ? s.inputs : s.inputs2}
            onChange={(e) => handleChange(e)}
          />
          <span className={errors.name ? s.span : null}>
            {errors.name ? errors.name : "✔️"}
          </span>
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
          <span className={s.span}>
            {errors.duration ? errors.duration : null}
          </span>
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
          <span className={s.span}>
            {errors.countries ? errors.countries : null}
          </span>

          <div className={s.optionsContainer}>
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
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length ? true : false}
        >
          Create activity
        </button>
      </form>
    </>
  );
}
