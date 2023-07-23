import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
export const server = "https://react-to-do-backend-api.onrender.com/api/v1"; 
export const Context = createContext({isAuthenticated:false,isLoading:false})
const AppWrapper = ()=>{
  const [isAuthenticated,setIsAuthenticated]= useState();
  const [isLoading,setIsLoading]= useState();
  return (
    <Context.Provider value={{setIsAuthenticated,isAuthenticated,isLoading,setIsLoading}}>
      <App />
    </Context.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
