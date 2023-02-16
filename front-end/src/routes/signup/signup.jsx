import React from "react";
import { Fragment } from "react";

import "./signup.css";

class SignUp extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="signupbox">
          <h1>Create Account</h1>
          <form>
            <input type="text" name="" placeholder="Name" />
            <input type="text" name="" placeholder="Email" />
            <input type="password" name="" placeholder="Password" />
            <input type="text" name="" placeholder="Address" />
            <input type="text" name="" placeholder="Zip code" />
            <input type="submit" name="" value="Submit" />
            <p className="signinlink">
              Have an account?
              <a href="/signin">Sign in</a>
            </p>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default SignUp;
