import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

import { getActivities, getCountries } from "../Redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    dispatch(getActivities());
  };

  return (
    <>
      <h1>Homepage</h1>

      <NavBar />
      <SearchBar />

      <form>
        <select>
          <option title="sort" value="asc">
            Ascendent
          </option>
          <option title="sort" value="desc">
            Descendent
          </option>
        </select>

        <select>
          {allActivities?.map((el, index) => {
            return (
              <option key={index} title="filt" value="asc">
                {el.name}
              </option>
            );
          })}
        </select>
      </form>

      <button onClick={(e) => handleClick(e)}>RESET</button>

      {allCountries && allCountries.length ? (
        allCountries.map((el, index) => {
          return (
            <Card
              key={index}
              id={el.id}
              name={el.name}
              image={el.image}
              continents={el.continents}
            />
          );
        })
      ) : (
        <h3>404 not found</h3>
      )}
    </>
  );
}
