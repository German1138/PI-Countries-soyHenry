import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getActivities, getCountries } from "../Redux/actions";

import s from "./LandingPage.module.css";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  return (
    <>
      <img
        src="https://cdn.unifiedcommerce.com/content/product/large/4005556132270_CAT_Export_TYP_300_RGB.jpg"
        alt="Draw of the planisferic world map"
        className={s.img}
      />

      <div className={s.center}>
        <NavLink to="/home" className={s.nl}>
          <img
            className={s.logo}
            width="500px"
            src="https://i.imgur.com/K341Tja.png"
          ></img>
          {/* <h1 className={s.h1}>Welcome to ¡What a travel!</h1> */}
        </NavLink>
      </div>
    </>
  );
}
