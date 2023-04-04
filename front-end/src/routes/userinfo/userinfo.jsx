import React from "react";
import "./userinfo.css";
import { PersonVcard, PinMap, ClockHistory } from "react-bootstrap-icons";

class UserInfo extends React.Component {

  constructor(props){
    super(props);
    let storage = window.localStorage;
    let user = {}
    user.name = storage.getItem("name")
    user.email = storage.getItem("email")
    user.address = storage.getItem("address")
    user.zipCode = storage.getItem("zipCode")
    console.log(user)
    this.state = {
      user: user
    }
  }

  render() {
    return <div id="userinfo">
      <div id="person">
        <div>{this.state.user?.name}</div>
        <PersonVcard className="card"></PersonVcard>
        <div className="person-item">
          <PinMap className="person-icon"></PinMap>
          <div>Address</div>
        </div>
        <div className="person-item">
          <ClockHistory className="person-icon"></ClockHistory>
          <div>History</div>
        </div>
      </div>
      <div className="sep"></div> 
      <div id="address">
        <h3>ADDRESS</h3>
        <p>Zip code:{this.state.user?.zipCode}</p>
        <p>Address:{this.state.user?.address}</p>
        <p>Email:{this.state.user?.email}</p>
      </div>
    </div>;
  }
}

export default UserInfo;
