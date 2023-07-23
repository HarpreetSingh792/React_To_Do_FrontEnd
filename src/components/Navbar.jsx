import React, { useContext, useState } from "react";
import { DarkLogo, Logo } from "../assets";
import { NavLink } from "react-router-dom";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

export const Navbar = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const [darkTheme, setDarkTheme] = useState(true);
  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/user/logout`, { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Logged Out ");
    } catch (err) {
      toast.error("Something went wrong.");
      setIsAuthenticated(true);
    }
  };

  return (
    <React.Fragment>
      <header>
        <nav className="navbar">
          <div className="logo">
            <NavLink to="/">
              <img
                src={darkTheme ? Logo : DarkLogo}
                width="70px"
                height="70px"
                alt="logo-img"
              />
            </NavLink>
          </div>
          <div className="navigations-links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            {!isAuthenticated && (
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Sign Up
              </NavLink>
            )}
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
            {isAuthenticated ? (
              <NavLink to="/login" onClick={logoutHandler}>
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            )}
            <button
              onClick={() => {
                setDarkTheme((prevLightTheme) => !prevLightTheme);
                // console.log(document.querySelector("body"))  //For debbuging purpose....
                darkTheme
                  ? document.querySelector("#root").classList.remove("light")
                  : document.querySelector("#root").classList.add("light");
                darkTheme
                  ? document.querySelector("#root").classList.add("dark")
                  : document.querySelector("#root").classList.remove("dark");
              }}
            >
              {darkTheme ? <FaRegLightbulb /> : <FaLightbulb />}
            </button>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};
