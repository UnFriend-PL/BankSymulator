import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal != null) {
      setUser(JSON.parse(userLocal));
    }
  }, []);

  return (
    <UserContext.Provider value={{ getUser, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
