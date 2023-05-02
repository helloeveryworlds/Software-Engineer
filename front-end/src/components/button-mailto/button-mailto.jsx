import React from "react";
import { Link } from "react-router-dom";

import "./button-mailto.css";

const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link
      to="#"
      onClick={(e) => {
        window.location.href = mailto;
        e.preventDefault();
      }}
      className="footer-email"
    >
      {label}
    </Link>
  );
};

export default ButtonMailto;
