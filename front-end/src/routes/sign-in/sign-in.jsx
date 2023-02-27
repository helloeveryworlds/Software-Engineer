import React from "react";
import { Fragment } from "react";
import axios from "axios";
import "./sign-in.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePwd = this.handleChangePwd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePwd(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit() {
    axios.post(
      "http://localhost:8080/login",
      {
        email:this.state.email,
        password:this.state.password
      }
      ,{timeout: 5000}
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      if( error){
          console.log(error);
      }
    });
  }

  render() {
    return (
      <Fragment>
        <div className="loginbox">
          <h1>Sign in</h1>
          <form>
            <input type="text" value={this.state.email} onChange={this.handleChangeEmail} name="" placeholder="Email" />
            <input type="password" value={this.state.password} onChange={this.handleChangePwd} name="" placeholder="Password" />
            <input type="submit" name="" value="Login" onClick={this.handleSubmit}/>
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
