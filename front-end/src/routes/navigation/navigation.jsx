import React, { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import HomeLogo from "../../assets/logo.png";
import Footer from "../../components/footer/footer";
import { PersonBoundingBox } from "react-bootstrap-icons";
import { UserContext } from "../../contexts/user.context";
import "./navigation.css";
import { notification } from "antd";

const Navigation = () => {
  const { isLogIn, userLogOut } = useContext(UserContext);
  const [selected, setSelected] = useState("home");

  const handleLogOut = () => {
    localStorage.clear();
    userLogOut();

    notification.success({
      message: "Logout Successful",
      style: {
        top: 65,
        right: 25,
        left: "auto",
        button: "auto",
        position: "fixed",
      },
      duration: 1,
    });
  };
  return (
    <Fragment>
      <div className="navigation-container">
        <Link
          className="logo-container"
          to="/"
          onClick={() => setSelected("home")}
        >
          <div>
            <img src={HomeLogo} alt="logo" className="logo-png" />
          </div>
        </Link>

        <div className="nav-links-container">
          <Link
            className="nav-link"
            to="/shopping"
            onClick={() => setSelected("shop")}
            style={{
              color: selected === "shop" ? "#000000" : "#6b6d74",
              textDecoration: "inherit",
            }}
          >
            <div />
            Shop
          </Link>
          <Link
            className="nav-link"
            to="/cart"
            onClick={() => setSelected("cart")}
            style={{
              color: selected === "cart" ? "#000000" : "#6b6d74",
              textDecoration: "inherit",
            }}
          >
            <div />
            Cart
          </Link>
          {isLogIn ? (
            <Link className="nav-link" onClick={handleLogOut}>
              <div />
              Sign Out
            </Link>
          ) : (
            <Link
              className="nav-link"
              to="/signin"
              onClick={() => setSelected("login")}
              style={{
                color: selected === "login" ? "#000000" : "#6b6d74",
                textDecoration: "inherit",
              }}
            >
              <div />
              LogIn
            </Link>
          )}
          <Link
            className="nav-link"
            to="/userinfo"
            onClick={() => setSelected("userinfo")}
            style={{
              color: selected === "userinfo" ? "#000000" : "#6b6d74",
              textDecoration: "inherit",
            }}
          >
            <div />
            <PersonBoundingBox />
          </Link>
        </div>
      </div>
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Navigation;
