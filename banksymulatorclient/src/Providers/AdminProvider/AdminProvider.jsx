import React, { createContext, useState, useContext, useEffect } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isSearchVisible, setIsSearchVisible] = useState(
    JSON.parse(localStorage.getItem("isSearchVisible")) || false
  );
  const [isLoginAsAdmin, setIsLoginAsAdminState] = useState(
    JSON.parse(localStorage.getItem("isLoginAsAdmin")) || false
  );
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [searchedUser, setSearchedUserState] = useState(
    JSON.parse(localStorage.getItem("searchedUser")) || null
  );

  const toggleSearchVisibility = () => {
    const newVisibility = !isSearchVisible;
    setIsSearchVisible(newVisibility);
    localStorage.setItem("isSearchVisible", JSON.stringify(newVisibility));
  };
  const setIsLoginAsAdmin = (value) => {
    localStorage.setItem("isLoginAsAdmin", JSON.stringify(value));
    setIsLoginAsAdminState(value);
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
  const getSearchedUser = () => {
    return searchedUser;
  };
  const setSearchedUser = (user) => {
    localStorage.setItem("searchedUser", JSON.stringify(user));
    setSearchedUserState(user);
  };
  useEffect(() => {
    const adminLocal = localStorage.getItem("admin");
    if (adminLocal != null) {
      setAdmin(JSON.parse(adminLocal));
    }
    const isSearchVisibleLocal = localStorage.getItem("isSearchVisible");
    if (isSearchVisibleLocal != null) {
      setIsSearchVisible(JSON.parse(isSearchVisibleLocal));
    }
    const isLoginAsAdminLocal = localStorage.getItem("isLoginAsAdmin");
    if (isLoginAsAdminLocal != null) {
      setIsLoginAsAdmin(JSON.parse(isLoginAsAdminLocal));
    }
    const searchedUserLocal = localStorage.getItem("searchedUser");
    if (searchedUserLocal != null) {
      setSearchedUserState(JSON.parse(searchedUserLocal));
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
        searchedUser,
        setSearchedUser,
        getSearchedUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
