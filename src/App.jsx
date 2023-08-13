import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { server, Context } from "./main";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [userData,setUserData]= useState({});
  const { setIsAuthenticated ,isLoading, setIsLoading,toastTheme,setToastTheme } = useContext(Context);
  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if(getTheme=="dark"){
      setToastTheme(true);
      document.querySelector("body").classList.add("dark");
      document.querySelector("body").classList.remove("light");
    }
    else{
      setToastTheme(false);
      document.querySelector("body").classList.add("light");
      document.querySelector("body").classList.remove("dark");
    }

    const getProfile = async () => {
       setIsLoading(true);
      try {
        const { data }  = await axios.get(`${server}/user/me`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUserData(data.user);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);
  
  return (
    <Router>
      <Navbar />
      {isLoading ? 
        (<Loader />):
      (<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile data={userData}/>} />
      </Routes>)}
      <Toaster toastOptions={{
        style:{
          zIndex:true,
          background:toastTheme?"black":"white",
          color:toastTheme?"white":"black"
        }
      }}/>
    </Router>
  );
}

export default App;
