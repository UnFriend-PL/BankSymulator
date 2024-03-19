import React, { createContext, useState, useContext } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <AdminContext.Provider value={{ isSearchVisible, toggleSearchVisibility }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
