import React from "react";
import { Fragment } from "react";
import "./sign-in.css";
import { Button, Form, Input, message } from "antd";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChangeEmail(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePwd(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const loginUrl = `/login?username=${this.state.username}&password=${this.state.password}`;
    console.log(loginUrl);
    
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      
      console.log(response.status);
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to log in");
      }
    });
  }

  render() {
    return (
      <Fragment>
        <div className="loginbox">
          <h1>Sign in</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              name=""
              placeholder="Email"
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChangePwd}
              name=""
              placeholder="Password"
            />
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
