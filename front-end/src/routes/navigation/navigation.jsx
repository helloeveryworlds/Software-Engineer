import React from "react";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import HomeLogo from "../../assets/logo.png";
import { PersonBoundingBox } from "react-bootstrap-icons";

import "./navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="navigation-container">
          <Link className="logo-container" to="/">
            <div>
              <img src={HomeLogo} alt="logo" className="logo-png" />
            </div>
          </Link>

          <div className="nav-links-container">
            <Link className="nav-link" to="/shopping">
              Shop
            </Link>

            <Link className="nav-link" to="/signin">
              Sign In / Up
            </Link>

            <Link className="nav-link" to="/userinfo">
              <PersonBoundingBox />
            </Link>
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }
}

export default Navigation;
