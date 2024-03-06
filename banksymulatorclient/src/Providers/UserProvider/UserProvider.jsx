import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getUserEmail } from "../../Services/TokenService";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      setUser(getUserEmail);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
