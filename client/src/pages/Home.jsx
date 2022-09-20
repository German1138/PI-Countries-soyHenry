import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import { getActivities, getCountries } from "../Redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  let [state, setState] = useState({ sort: "asc", filter: "" });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getCountries(state));
    dispatch(getActivities());
  }, [state]);

  const handleClick = (e) => {
    e.preventDefault();
    setState({ sort: "", filter: "" });
    dispatch(getCountries((state = { sort: "", filter: "" })));
    dispatch(getActivities());
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = allCountries.slice(firstPostIndex, lastPostIndex);

  /* useEffect(() => {
    if (currentPage === 1) {
      setPostsPerPage(9);
    } else setPostsPerPage(10);
  }, [currentPage]); */

  return (
    <>
      <h1>Homepage</h1>

      <NavBar />
      <SearchBar />

      <form>
        <select name="sort" onChange={(e) => handleChange(e)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select name="sort" onChange={(e) => handleChange(e)}>
          <option value="most">Most population</option>
          <option value="least">Least population</option>
        </select>

        <select name="filter" onChange={(e) => handleChange(e)}>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>

        <select name="filter" onChange={(e) => handleChange(e)}>
          {allActivities?.map((el, index) => {
            return (
              <option key={index} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>
      </form>

      <button onClick={(e) => handleClick(e)}>RESET</button>

      <Pagination
        totalPosts={allCountries.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />

      {currentPosts && currentPosts.length ? (
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
        <h3>404 not found</h3>
      )}
    </>
  );
}
