import React from "react";
// import axios from "axios";
import "./sign-up.css";
import { notification } from "antd";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeZipcode = this.handleChangeZipcode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      success: false,
      name: "",
      email: "",
      password: "",
      address: "",
      zipcode: "",
    };
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
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

  handleChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  handleChangeZipcode(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }

  /*   handleSubmit(e) {
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
  } */

  handleSubmit(e) {
    e.preventDefault();
    // if (!this.state.name || !this.state.email || !this.state.password || !this.state.address || !this.state.zipcode) {
    //   notification.open({
    //     message: 'Email duplicated.',
    //     onClick: () => {
    //       console.log('Notification Clicked!');
    //     },
    //   });
    // }
    const signupUrl = `/signup`;
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      zipCode: this.state.zipcode,
    };

    fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => {
      // alert("sign up success");
      console.log(response.status);
      if (response.status === 409) {
        notification.open({
          message: "Email duplicated.",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        return;
      }
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to sign up");
      } else {
        console.log("success");
        this.setState({ success: true });
      }
    });
  }

  render() {
    return (
      <div className="signup-container">
        {this.state.success && <Navigate to="/signin" replace="true" />}
        <div className="signupbox">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.name}
              maxlength="15"
              onChange={this.handleChangeName}
              name=""
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={this.state.email}
              pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$"
              onChange={this.handleChangeEmail}
              name=""
              placeholder="Email"
              required
            />
            <input
              type="password"
              minLength="6"
              maxlength="18"
              value={this.state.password}
              onChange={this.handleChangePwd}
              name=""
              placeholder="Password"
              required
            />
            <input
              type="text"
              name=""
              maxlength="25"
              value={this.state.address}
              onChange={this.handleChangeAddress}
              placeholder="Address"
              required
            />
            <input
              type="number"
              name=""
              maxLength="5"
              list="citycode"
              value={this.state.zipcode}
              onChange={this.handleChangeZipcode}
              placeholder="Zip code"
              required
            />
            <datalist id="citycode">
              <option value="02101" />
              <option value="02102" />
              <option value="02103" />
              <option value="02104" />
              <option value="02105" />
              <option value="02106" />
              <option value="02107" />
              <option value="02108" />
              <option value="02109" />
              <option value="02110" />
              <option value="02111" />
              <option value="02112" />
              <option value="02113" />
              <option value="02114" />
              <option value="02115" />
              <option value="02116" />
              <option value="02117" />
              <option value="02118" />
              <option value="02119" />
              <option value="02120" />
              <option value="02121" />
              <option value="02122" />
              <option value="02123" />
              <option value="02124" />
              <option value="02125" />
              <option value="02126" />
              <option value="02127" />
              <option value="02128" />
              <option value="02129" />
              <option value="02130" />
              <option value="02131" />
              <option value="02132" />
              <option value="02133" />
              <option value="02134" />
              <option value="02135" />
              <option value="02136" />
              <option value="02137" />
              <option value="02163" />
              <option value="02199" />
              <option value="02203" />
              <option value="02205" />
              <option value="02208" />
              <option value="02209" />
              <option value="02199" />
              <option value="02210" />
              <option value="02215" />
              <option value="02222" />
              <option value="02228" />
              <option value="02283" />
              <option value="02284" />
              <option value="02455" />
            </datalist>
            <input type="submit" name="" value="Submit" />
            <p className="signinlink">
              Have an account?
              <a href="/signin">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
