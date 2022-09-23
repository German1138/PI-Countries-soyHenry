import React from "react";
import { NavLink } from "react-router-dom";

import SearchBar from "./SearchBar";

import s from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={s.nav}>
      <NavLink className={s.navLink} to="/home">
        Home
      </NavLink>
      <NavLink className={s.navLink} to="/createActivity">
        Create activity
      </NavLink>
      <SearchBar />
    </nav>
  );
}
