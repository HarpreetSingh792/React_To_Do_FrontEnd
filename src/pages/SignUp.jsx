import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import {motion} from "framer-motion";

const SignUp = () => {
  const { setIsAuthenticated, isAuthenticated ,isLoading,setIsLoading} = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputFocus = (index) => {
    const label = document.getElementsByTagName("label");
    for (let i = 0; i < label.length; i++) {
      if (name || password || email) break;
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
        `${server}/user/register`,
        { name: name, email: email, password },
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
    } catch (err) {
      toast.error(err.response.data?.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
    
  };
  return (
    isAuthenticated ? <Navigate to="/"></Navigate>:
    <div className="form-class">
      <span className="blob"></span>
      <span className="blob1"></span>
      <span className="blob2"></span>
      <form onSubmit={submitHandler}>
        <h2>SignUp</h2>

        <section>
          <label htmlFor="username">Enter your Username </label>
          <input
            type="text"
            value={name}
            name="name"
            onClick={() => {
              inputFocus(0);
            }}
            onChange={(e) => {
              setName(e.target.value);
              onInputChange(e,0)
            }}
            required
          />
        </section>

        <section>
          <label htmlFor="email">Enter your Email </label>
          <input
            type="email"
            value={email}
            name="email"
            onClick={() => {
              inputFocus(1);
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              onInputChange(e,1)
            }}
            required
          />
        </section>
        <section>
          <label htmlFor="password">Enter your Password </label>
          <input
            type="password"
            value={password}
            name="password"
            onClick={() => {
              inputFocus(2);
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              onInputChange(e,2)
            }}
            required
          />
        </section>
        <section className="btn-link">
          <motion.button whileHover={{scale:0.9}} whileTap={{scale:0.9}} type="submit" disabled={isLoading}>Sign Up</motion.button>
          <p>or</p>
          <motion.div whileHover={{scale:0.9}} whileTap={{scale:0.9}}>
          <Link to="/login">Already a user. Sign In</Link>
          </motion.div>
        </section>
      </form>
    </div>
  );
};

export default SignUp;
