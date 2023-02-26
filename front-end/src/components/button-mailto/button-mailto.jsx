import React from "react";
import { Link } from "react-router-dom";

import "./button-mailto.css";

class ButtonMailto extends React.Component {
  render() {
    return (
      <Link
        to="#"
        onClick={(e) => {
          window.location.href = this.props.mailto;
          e.preventDefault();
        }}
        className="footer-email"
      >
        {this.props.label}
      </Link>
    );
  }
}

export default ButtonMailto;
