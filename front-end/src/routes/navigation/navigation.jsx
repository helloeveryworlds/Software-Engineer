import React from "react";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import HomeLogo from "../../assets/logo.png";
import Footer from "../../components/footer/footer";
import { PersonBoundingBox } from "react-bootstrap-icons";
// import {motion} from 'framer-motion';
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
              <div />
              Shop
            </Link>
            <Link className="nav-link" to="/signin">
              <div />
              Sign In
            </Link>

            <Link className="nav-link" to="/userinfo">
              <div />
              <PersonBoundingBox />
            </Link>
          </div>
        </div>
        <Outlet />
        <Footer />
      </Fragment>
    );
  }
}

export default Navigation;
