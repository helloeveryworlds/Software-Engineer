import React from "react";

const NoAuth = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      You haven't logged in. Please <a href="/signin">LogIn</a> first.
    </div>
  );
};

export default NoAuth;
