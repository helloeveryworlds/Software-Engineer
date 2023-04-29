import React, { useContext, useEffect } from "react";

import SearchBar from "../../components/search-bar/search-bar";

import "./home.css";
import { UserContext } from "../../contexts/user.context"

const Home = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  useEffect(() => {
    let user = {}
    user.name = localStorage.getItem("name")
    user.email = localStorage.getItem("email")
    user.address = localStorage.getItem("address")
    user.zipCode = localStorage.getItem("zipCode")
    console.log(user)
    if (user.name || user.email) {
      setCurrentUser({
        name: user.name,
        email: user.email,
        address: user.address,
        zipCode: user.zipCode
      })
    }
  }, [])
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="home-right">
        <SearchBar />
        <p data-testid="slogan">The right store with the right price</p>
      </div>
    </div>
  );
};

export default Home;
