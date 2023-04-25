import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  isLogIn: true,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "zz",
    email: "1@gmail.com",
    password: "$2a$10$54OD26kxHrtPpODHP4TOlO6.LcQou1wXlnWmqboNcMY9E2tA9Yzuq",
    enabled: true,
    address: "asd",
    zipCode: "02134",
    cart: {
      id: 16,
      orderItemList: [],
    },
  });
  const [isLogIn, setIsLogIn] = useState(true);

  useEffect(() => {
    if (currentUser != null) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, [currentUser]);

  const value = { currentUser, setCurrentUser, isLogIn };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
