import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/createActivity">Create activity</Link>
      </li>
    </ul>
  );
}
