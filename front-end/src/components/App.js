import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "../routes/navigation/navigation";
import Home from "../routes/home/home";
import SignIn from "../routes/sign-in/sign-in";
import SignUp from "../routes/sign-up/sign-up";
import Shopping from "../routes/shopping/shopping";
import UserInfo from "../routes/userinfo/userinfo";
import SearchResult from "./search-result/search-result";
// import Fruits from "../routes/fruits/fruits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shopping",
        element: <Shopping />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "userinfo",
        element: <UserInfo />,
      },
      {
        path: "search-result/:query",
        element: <SearchResult />,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
