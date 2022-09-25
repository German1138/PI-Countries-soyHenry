import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";

import s from "./Home.module.css";

import { getActivities, getCountries } from "../Redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  let [state, setState] = useState({
    sort: "asc",
    continent: "",
    activity: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getCountries(state));
    setCurrentPage(1);
    dispatch(getActivities());
  }, [state]);

  const handleReset = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setState({ sort: "", continent: "", activity: "" });
    dispatch(getCountries((state = { sort: "", continent: "", activity: "" })));
    dispatch(getActivities());
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EL APPLY");
  }; */

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [postsOnFirstPage, setPostsOnFirstPage] = useState(9);

  const difference = postsPerPage - postsOnFirstPage;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = allCountries.slice(
    currentPage === 1 ? firstPostIndex : firstPostIndex - difference,
    lastPostIndex - difference
  );

  /* useEffect(() => {
    if (currentPage === 1) {
      setPostsPerPage(9);
    } else setPostsPerPage(10);
  }, [currentPage]); */

  return (
    <>
      <NavBar />
      <div className={s.divh1}>
        <h1
          className={s.h1}
          onClick={() => {
            window.location.reload();
          }}
        >
          Homepage
        </h1>
      </div>
      <form
        className={s.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <select
          className={s.select}
          name="sort"
          onChange={(e) => handleChange(e)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
          className={s.select}
          name="sort"
          onChange={(e) => handleChange(e)}
        >
          <option value="most">Most population</option>
          <option value="least">Least population</option>
        </select>

        <select
          className={s.select}
          name="continent"
          onChange={(e) => handleChange(e)}
        >
          <option value="">All continents</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>

        <select
          className={s.select}
          name="activity"
          onChange={(e) => handleChange(e)}
        >
          <option value="">---</option>
          {allActivities?.map((el, index) => {
            return (
              <option key={index} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>
        {/* <button className={s.select} type="submit">
          APPLY
        </button> */}
        <button className={s.select} onClick={(e) => handleReset(e)}>
          RESET
        </button>
      </form>

      <Pagination
        totalPosts={allCountries.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className={s.grid}>
        {/* {currentPosts && currentPosts.length ? (
          currentPosts.map((el, index) => {
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
          <h3 className={s.h3}>404 not found</h3>
        )} */}

        {/* CAMBIAR LO DE ABAJO A IFs y poner el caso de que sea array vacio */}
        {currentPosts[0] !== "404 not found" ? (
          currentPosts && currentPosts.length ? (
            currentPosts.map((el, index) => {
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
            <span className={s.loader}></span>
          )
        ) : (
          <h3 className={s.h3}>404 not found</h3>
        )}
      </div>
    </>
  );
}
