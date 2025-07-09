import { createContext, useState, useEffect, useContext } from "react";

const userAuthContext = createContext()

export const AuthProvider = ({ children}) => {
   const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser === "undefined") return null;
    return JSON.parse(storedUser);
  } catch (e) {
    console.error("Invalid user JSON in localStorage", e);
    localStorage.removeItem('user');
    return null;
  }
});




   const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

const logout = () => {
     setUser(null);
  localStorage.removeItem('user');
}


    return (
        <userAuthContext.Provider value={{login, user, logout}}>
            {children}
        </userAuthContext.Provider>
    )
}

export const useAuth = () => useContext(userAuthContext);