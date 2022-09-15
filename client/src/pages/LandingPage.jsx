import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <h1>Welcome to ¡What a travel! app</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </>
  );
}
