import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import { getCountry } from "../Redux/actions";
import SearchBar from "../components/SearchBar";

export default function DetailCountry() {
  const countryDetail = useSelector((state) => state.countries);
  const { activities } = countryDetail;

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCountry(params.id));
  }, []);

  return (
    <>
      <NavBar />
      <SearchBar />
      <p>ID: {countryDetail.id}</p>
      <h1>{countryDetail.name}</h1>
      <img
        src={countryDetail.image}
        alt={`Image of ${countryDetail.name}`}
        width="300px"
      />
      <ul>
        <li>Capital: {countryDetail.capital}</li>
        <li>Continents: {countryDetail.continents}</li>
        <li>Subregion: {countryDetail.subregion}</li>
        <li>Area: {countryDetail.area}km2</li>
        <li>Population: {countryDetail.population}</li>
      </ul>

      <h2>Activities</h2>
      {activities && activities.length
        ? activities.map((el, index) => {
            return (
              <div key={index}>
                <h3>{el.name}</h3>
                <ul>
                  <li>Season: {el.season}</li>
                  <li>Duration: {el.duration}</li>
                  <li>Difficulty: {el.difficulty}</li>
                </ul>
              </div>
            );
          })
        : `Right now ${countryDetail.name} has no activities`}
    </>
  );
}
