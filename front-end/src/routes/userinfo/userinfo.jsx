import React, { Fragment, useContext } from "react";
import "./userinfo.css";
import { PersonVcard, PinMap, ClockHistory } from "react-bootstrap-icons";
import NoAuth from "../../components/no-auth/no-auth";
import { UserContext } from "../../contexts/user.context";

const UserInfo = () => {
  // constructor(props) {
  //   super(props);
  //   let storage = window.localStorage;
  //   let user = {};
  //   user.name = storage.getItem("name");
  //   user.email = storage.getItem("email");
  //   user.address = storage.getItem("address");
  //   user.zipCode = storage.getItem("zipCode");

  //   this.state = {
  //     user: user,
  //   };
  // }
  const { isLogIn, currentUser } = useContext(UserContext);

  return (
    <div id="userinfo">
      <div id="person">
        <div>{currentUser.name}</div>
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
        {!isLogIn ? (
          <NoAuth />
        ) : (
          <Fragment>
            <h3>ADDRESS</h3>
            <p>Zip code:{currentUser.zipCode}</p>
            <p>Address:{currentUser.address}</p>
            <p>Email:{currentUser.email}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
