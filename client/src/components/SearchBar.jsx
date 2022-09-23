import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { searchCountry } from "../Redux/actions";

import s from "./SearchBar.module.css";

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
    <div className={s.div}>
      <input
        type="text"
        className={s.input}
        autoFocus
        placeholder="Argentina"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button className={s.btn} onClick={(e) => handleClick(e)}>
        <NavLink className={s.navLink} to="/home">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png"
            alt="black magnifying glass"
            className={s.img}
          />
        </NavLink>
      </button>
    </div>
  );
}
