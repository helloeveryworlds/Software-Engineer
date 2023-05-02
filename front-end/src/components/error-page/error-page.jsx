import React from "react";
import { useRouteError } from "react-router-dom";

import "./error-page.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        Go Back to <a href="/">Home</a> Page
      </p>
    </div>
  );
};

export default ErrorPage;
