import React from "react";
import { Fragment } from "react";
import axios from "axios";
import "./sign-up.css";

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePwd = this.handleChangePwd.bind(this)
    this.handleChangeAddress = this.handleChangeAddress.bind(this)
    this.handleChangeZipcode = this.handleChangeZipcode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      name: "",
      email: "",
      password: "",
      address: "",
      zipcode: ""
    }
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
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

  handleChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  handleChangeZipcode(e) {
    this.setState({
      zipcode: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(
      "http://localhost:8080/signup",
      {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        zipcode: this.state.zipcode
      } 
      ,{timeout: 5000}
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      if( error){
          console.log(error);
          alert(error.message)
      }
    });
  }

  render() {
    return (
      <Fragment>
        <div className="signupbox">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} onChange={this.handleChangeName} name="" placeholder="Name" />
            <input type="text" value={this.state.email} onChange={this.handleChangeEmail} name="" placeholder="Email" />
            <input type="password" value={this.state.password} onChange={this.handleChangePwd} name="" placeholder="Password" />
            <input type="text" name="" value={this.state.address} onChange={this.handleChangeAddress} placeholder="Address" />
            <input type="text" name="" value={this.state.zipcode} onChange={this.handleChangeZipcode} placeholder="Zip code" />
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
