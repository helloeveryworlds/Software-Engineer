import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  currentUser: {},
  isLogIn: false,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      setIsLogIn(false);
    } else {
      setIsLogIn(true);
    }
  }, [currentUser]);

  const userLogOut = () => {
    axios.get("/logout");
    setCurrentUser({});
    setIsLogIn(false);
  };

  const value = { currentUser, setCurrentUser, isLogIn, userLogOut };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
