import React, { useContext, useState } from "react";
import { DarkLogo, Logo } from "../assets";
import { NavLink } from "react-router-dom";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

export const Navbar = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const [slide, setSlide] = useState(false);
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
  const slideHandler = () => {
    setSlide((prev) => !prev);
    const lines = document.querySelectorAll(".nav-hamburger");
    if (!slide) {
      lines.forEach((ele) => {
        ele.style.width = "30px";
      });
    } else {
      for (let i = 0; i < 3; i++) {
        lines[i].style.width = 5 * (i + 1) * 1.5 + "px";
      }
    }
  };
  const closeSlideHandler = () => {
    setSlide(false);
    const lines = document.querySelectorAll(".nav-hamburger");
    for (let i = 0; i < 3; i++) {
      lines[i].style.width = 5 * (i + 1) * 1.5 + "px";
    }
  };
  return (
    <React.Fragment>
      <header>
        <nav className="navbar">
          <div className="logo">
            <NavLink to="/">
              <img
                src={localStorage.getItem("theme") == "light" ? Logo : DarkLogo}
                width="70px"
                height="70px"
                alt="logo-img"
              />
            </NavLink>
          </div>
          <div className="navigation-links-hamburger">
            <div className="navigation-hamburger" onClick={slideHandler}>
              <span className="nav-hamburger"></span>
              <span className="nav-hamburger"></span>
              <span className="nav-hamburger"></span>
            </div>

            {slide && (
              <div className="slider-nav">
                <button onClick={closeSlideHandler}>
                  <RxCross2 />
                </button>
                <div className="navigations-link">
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
                      darkTheme
                        ? localStorage.setItem("theme", "dark")
                        : localStorage.setItem("theme", "light");
                      // console.log(document.querySelector("body"))  //For debbuging purpose....
                      darkTheme
                        ? document
                            .querySelector("#root")
                            .classList.remove("light")
                        : document
                            .querySelector("#root")
                            .classList.add("light");
                      darkTheme
                        ? document.querySelector("#root").classList.add("dark")
                        : document
                            .querySelector("#root")
                            .classList.remove("dark");
                    }}
                  >
                    {darkTheme ? <FaRegLightbulb /> : <FaLightbulb />}
                  </button>
                </div>
              </div>
            )}
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
                darkTheme
                ? localStorage.setItem("theme", "dark")
                : localStorage.setItem("theme", "light");
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
