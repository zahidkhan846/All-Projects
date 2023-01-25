import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center">
      <h1 className="page-name text-yellow-300">Blog App</h1>
      <Link to="/add-post" className="hero-button">
        Add Posts
        <svg
          className="w-7 h-7 ml-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </Link>
    </div>
  );
}

export default Hero;
