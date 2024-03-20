import React, { createContext, useState, useContext, useEffect } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoginAsAdmin, setIsLoginAsAdmin] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const setAdminData = (adminData, token = localStorage.getItem("token")) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", token);
  };
  const getAdminData = () => {
    return JSON.parse(localStorage.getItem("admin"));
  };
  const getAdminToken = () => {
    return localStorage.getItem("adminToken");
  };
  useEffect(() => {
    const adminLocal = localStorage.getItem("admin");
    if (adminLocal != null) {
      setAdmin(JSON.parse(adminLocal));
    }
  }, []);
  return (
    <AdminContext.Provider
      value={{
        isSearchVisible,
        toggleSearchVisibility,
        isLoginAsAdmin,
        setIsLoginAsAdmin,
        getAdminData,
        setAdminData,
        getAdminToken,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
