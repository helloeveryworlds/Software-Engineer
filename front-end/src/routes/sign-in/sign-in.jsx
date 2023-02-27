import React from "react";
import { Fragment } from "react";

import "./sign-in.css";

class SignIn extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="loginbox">
          <h1>Sign in</h1>
          <form>
            <input type="text" name="" placeholder="Email" />
            <input type="password" name="" placeholder="Password" />
            <input type="submit" name="" value="Login" />
            <p className="signuplink">
              <a href="/signup">Don't have an account?</a>
            </p>
            <p className="signuplink">
              <a href="../signup/signup.jsx">Forgot your password?</a>
            </p>
          </form>
        </div>{" "}
      </Fragment>
    );
  }
}

export default SignIn;
