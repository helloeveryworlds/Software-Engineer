import React, {Component}  from "react";
import { Fragment } from "react";
// import axios from "axios";
import "./sign-in.css";
import { useLocation,useNavigate,useParams, Navigate } from 'react-router-dom';
// import { Button, Form, Input, message } from "antd";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      success: false,
      email: "",
      password: "",
    };
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleChangePwd(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    const loginUrl = `/login?username=${this.state.email}&password=${this.state.password}`;

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to log in");
      } else {
        this.setState({success:true})
      }
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.success && (

          <Navigate to='/' replace='true' />

        )}
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
