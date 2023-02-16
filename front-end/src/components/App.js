// import "../styles/App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Navigation from "../routes/navigation/navigation";
import SignIn from "../routes/signin/signin";
import SignUp from "../routes/signup/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          {/* Landing page */}
          {/* <Route index element={<Home />} /> */}

          {/* shopping page */}
          {/* <Route path="shopping" element={<Shopping />} /> */}

          {/* sign in page */}
          <Route path="signin" element={<SignIn />} />

          {/* sign up page */}
          <Route path="signup" element={<SignUp />} />

          {/* user info page */}
          {/* <Route path="userinfo" element={<UserInfo />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
