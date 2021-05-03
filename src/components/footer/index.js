import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'
import conImg from '../../assets/icons/fblogo.png'
/**
* @author
* @function Forfooter
**/

const Forfooter = (props) => {
  return(
    <div className="footerContainer">
        <div className="fLeft">
            <label className="footerHeaderL" htmlFor="toggle-footerLContent">Contact Us</label>
            <input type="checkbox" id="toggle-footerLContent"/>
            
            <div className="footerContentL">
                <p>Email Us @ sample.email@email.com</p>
                <p>Phone # 0909-090-0909</p>
            </div>
        </div>

        <div className="fMiddle">
            <label className="footerHeaderM" htmlFor="toggle-footerMContent">Navigation</label>
            <input type="checkbox" id="toggle-footerMContent"/>

            <div className="footerContentM">
                <div className="footer-navbar-links">
                    <ul>
                        {/* <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/subjects">Subjects</NavLink></li>
                        <li><a href="/">Instructors</a></li>
                        <li><NavLink to="/account">Account</NavLink></li> */}

                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/students">Student</NavLink></li>
                        <li><NavLink to="/subjects">Subjects</NavLink></li>
                        {/* <li><NavLink to="/subjects" className="subjInfo">Subjects</NavLink></li> */}
                        <li><NavLink to="/instructors">Instructors</NavLink></li>
                        <li><NavLink to="/assignsubjects">Assign Subjects</NavLink></li>

                    </ul>
                    </div>
                </div>
        </div>

        <div className="fRight">
        <label className="footerHeaderM" htmlFor="toggle-footerRContent">Let's keep in touch</label>
            <input type="checkbox" id="toggle-footerRContent"/>
            
            <div className="footerContentR">
                <a href="/">
                    <img src={conImg} alt="conn" width="100%" />
                </a>
            </div>
        </div>
    </div>
   )

 }

export default Forfooter