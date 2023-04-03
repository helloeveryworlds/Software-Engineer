import React from "react";

import SearchBar from "../../components/search-bar/search-bar";

import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-right">
        <SearchBar />
        <p className="home-slogan" data-testid="slogan">
          The right store with the right price
        </p>
      </div>
    </div>
  );
};

export default Home;
