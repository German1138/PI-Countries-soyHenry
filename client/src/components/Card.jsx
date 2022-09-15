import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div>
      <Link to={`/detail/${props.id}`}>
        <h3>{props.name}</h3>
        <img
          src={props.image}
          alt={`Image of ${props.name}`}
          width="auto"
          height="200px"
        />
        <p>{props.continents}</p>
      </Link>
    </div>
  );
}
