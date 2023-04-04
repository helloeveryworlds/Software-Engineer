import React from "react";
import "./userinfo.css";
import { PersonVcard, PinMap, ClockHistory } from "react-bootstrap-icons";

class UserInfo extends React.Component {

  render() {
    return <div id="userinfo">
      <div id="person">
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
        <p>Zip code:</p>
        <p>Address:</p>
        <p>Email:</p>
      </div>
    </div>;
  }
}

export default UserInfo;
