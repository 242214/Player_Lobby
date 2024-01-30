import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import UploadFile from "./UploadFile";
import MyProfile from "./MyProfile";
import "./myfiles.css";

const MyFiles = () => {
  return (
    <Router>
      <div className="homepage-container">
        <div className="sidebar">
          <NavLink to="/homepage/myfiles" activeClassName="active" id="active">
            Files
          </NavLink>
          <NavLink to="/homepage/uploadfile" activeClassName="active">
            Upload a new file
          </NavLink>
          <NavLink to="/homepage/myprofile" activeClassName="active">
            Profile
          </NavLink>
        </div>
        <div className="content">
          <div className="file-box">File 1</div>
          <div className="file-box">File 2</div>
          <div className="file-box">File 3</div>
          <div className="file-box">File 4</div>
          <div className="file-box">File 5</div>
          <div className="file-box">File 6</div>
          <div className="file-box">File 7</div>
          <div className="file-box">File 8</div>
          <div className="file-box">File 9</div>
          <div className="file-box">File 10</div>
          <div className="file-box">File 11</div>
          <div className="file-box">File 12</div>
          <div className="file-box">File 13</div>
          <div className="file-box">File 14</div>
          <div className="file-box">File 15</div>
          <div className="file-box">File 16</div>
          <Route>
            <Route path="/homepage/myfiles" element={<MyFiles/>} />
            <Route path="/homepage/uploadfile" element={<UploadFile/>} />
            <Route path="/homepage/myprofile" element={<MyProfile/>} />
          </Route>
        </div>
      </div>
    </Router>
  );
};

export default MyFiles;
