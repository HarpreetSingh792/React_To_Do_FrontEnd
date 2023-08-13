import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server, Context } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, isAuthenticated, isLoading, setIsLoading } =
    useContext(Context);

  const inputFocus = (index) => {
    const label = document.getElementsByTagName("label");
    for (let i = 0; i < label.length; i++) {
      if (password || email) break;
      label[i].style.top = "14px";
      label[i].style.left = "14px";
      label[i].style.fontSize = "1rem";
    }
    const labelPos = label[index];
    labelPos.style.top = "-14px";
    labelPos.style.left = "10px";
    labelPos.style.fontSize = "0.8rem";
  };

  const onInputChange = (e, index) => {
    const label = document.getElementsByTagName("label")[index];
    if (!e.target.value) {
      label.style.top = "14px";
      label.style.left = "14px";
      label.style.fontSize = "1rem";
      label.style.zIndex = 7;
    } else {
      label.style.top = "-14px";
      label.style.left = "10px";
      label.style.fontSize = "0.8rem";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isAuthenticated && <Navigate to="/" />}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="form-class">
          <span className="blob"></span>
          <span className="blob1"></span>
          <span className="blob2"></span>
          <form onSubmit={submitHandler}>
            <h2>Log In</h2>
            <section>
              <label htmlFor="email">Enter your Email </label>
              <input
                type="email"
                value={email}
                name="email"
                onClick={() => {
                  inputFocus(0);
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  onInputChange(e, 0);
                }}
              />
            </section>
            <section>
              <label htmlFor="password">Enter your Password </label>
              <input
                type="password"
                value={password}
                name="password"
                onClick={() => {
                  inputFocus(1);
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  onInputChange(e, 1);
                }}
              />
            </section>
            <section className="btn-link">
              <motion.button
                whileHover={{ scale: 0.9}}
                whileTap={{ scale: 0.9}}
                disabled={isLoading}
                type="submit"
              >
                Log in
              </motion.button>
              <p>or</p>
              <motion.div whileHover={{scale:0.9}} whileTap={{scale:0.9}}>
              <Link to="/signup">Sign Up</Link>
              </motion.div>
            </section>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
