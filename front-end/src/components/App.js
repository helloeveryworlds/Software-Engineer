// import "../styles/App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Navigation from "../routes/navigation/navigation";
import Home from "../routes/home/home";
import SignIn from "../routes/sign-in/sign-in";
import SignUp from "../routes/sign-up/sign-up";
import Shopping from "../routes/shopping/shopping";
import UserInfo from "../routes/userinfo/userinfo";
// import Fruits from "../routes/fruits/fruits";

import SearchResult from "./search-result/search-result";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          {/* Landing page */}
          <Route index element={<Home />} />

          {/* shopping page */}
          <Route path="shopping" element={<Shopping />} />

          {/* sign in page */}
          <Route path="signin" element={<SignIn />} />

          {/* sign up page */}
          <Route path="signup" element={<SignUp />} />

          {/* user info page */}
           <Route path="userinfo" element={<UserInfo />} />   

          {/* fruits page */}
          {/* <Route path="fruits" element={<Fruits />} /> */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
