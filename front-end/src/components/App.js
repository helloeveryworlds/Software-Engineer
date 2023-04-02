import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "../routes/navigation/navigation";
import ErrorPage from "./error-page/error-page";
import Home from "../routes/home/home";
import SignIn from "../routes/sign-in/sign-in";
import SignUp from "../routes/sign-up/sign-up";
import Shopping from "../routes/shopping/shopping";
import UserInfo from "../routes/userinfo/userinfo";
import SearchResult from "./search-result/search-result";
import { ProductsProvider } from "../contexts/products.context";
import ItemCart from "../routes/item-cart/item-cart";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />,
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
      {
        path: "item-cart/:category",
        element: <ItemCart />,
      }
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </React.StrictMode>
  );
}

export default App;
