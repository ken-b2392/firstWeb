import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

function ForNavBar() {


      return(
        <div className="NavbarContains">
              <nav className="navbar">
                <div className="webtitle">
                  First Website
                </div>
                <label className="fortoggle" htmlFor="toggle-button">&#9776;</label>
                <input type="checkbox" id="toggle-button"/>
                <div className="navbar-links">
                  <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/students">Student</NavLink></li>
                    <li><NavLink to="/subjects" className="subjInfo">Subjects</NavLink></li>
                    <li><NavLink to="/instructors">Instructors</NavLink></li>
                    <li><NavLink to="/assignsubjects">Assign Subjects</NavLink></li>
                  </ul>
                </div>
              </nav>
        </div>
      )
}

export default ForNavBar
