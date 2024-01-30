// App.js

import React from "react";
import {BrowserRouter as Router, Route, Navigate, Routes} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Homepage from "./HomePage";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/">
                <Route to="/signin" />
            </Route>
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/homepage" element={<Homepage/>} />
        </Routes>
    </Router>
  );
}

export default App;
