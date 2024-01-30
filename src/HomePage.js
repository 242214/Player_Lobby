import React from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import MyFiles from "./MyFiles.js";

function HomePage() {
  return (
    <Router>
      <Route exact path="/homepage">
        <Route to="/homepage/myfiles" />
      </Route>
      <Route path="/homepage" element={<MyFiles/>} />
    </Router>
  );
}

export default HomePage;
