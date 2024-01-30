// SignIn.js

import React, { useState } from "react";
import "./styles.css";
import Header from "./Header";

const SignIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Perform sign-in logic (e.g., send data to server for authentication)
    console.log("Signing in with:", usernameOrEmail, password);
  };

  return (
    <div id="container">
      <Header />
      <h2>Sign In</h2>
      <form id="form">
        <label>
          Username / Email
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
      <p id="link">
        <a href="/signup">Don't have an account?</a>
      </p>
    </div>
  );
};

export default SignIn;
