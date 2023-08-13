import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
export const server = "https://react-to-do-backend-api.onrender.com/api/v1"; 
export const Context = createContext({isAuthenticated:false,isLoading:false,toastTheme:localStorage.getItem("theme")=="dark"})
const AppWrapper = ()=>{
  const [isAuthenticated,setIsAuthenticated]= useState();
  const [isLoading,setIsLoading]= useState();
  const [toastTheme,setToastTheme] = useState();
  return (
    <Context.Provider value={{setIsAuthenticated,isAuthenticated,isLoading,setIsLoading,toastTheme,setToastTheme}}>
      <App />
    </Context.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
