import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { IoIosLogOut } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import {
  isTokenExpired,
  clearToken,
} from "../../Services/TokenService";
import { IoMailOpenSharp } from "react-icons/io5";

function Navbar() {
  const { getUser, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = (showNotification = true) => {
    localStorage.removeItem("token");
    setUserData(null);
    clearToken();
    navigate("/");
    if (showNotification)
      showNotification([
        {
          message: "You have been logged out.",
          type: "info",
        },
      ]);
  };

  const { showNotification } = useContext(NotificationContext);
  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("token") !== null && (await isTokenExpired())) {
        showNotification([
          {
            message: "Your session has expired.",
            type: "error",
          },
          {
            message: "You have been logged out.",
            type: "info",
          },
        ]);
        handleLogout(false);
        clearToken();
        return;
      }
    };
    checkToken();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__title">
        Bank Symulator
      </Link>
      {getUser() == null ? (
        <div className="navbar__links">
          <Link to="/login">Login</Link>
          <Link to="/register">Sing Up</Link>
        </div>
      ) : (
        <>
          <div className="navbar__links">
            <Link to="/applications">
              <IoMailOpenSharp className="ico" />
            </Link>
            <Link to="/">
              <MdAccountBalance className="ico" />
            </Link>
            <Link to="/profile">
              <MdManageAccounts className="ico" />
            </Link>
            <Link to="/" onClick={handleLogout}>
              <IoIosLogOut className="logout" />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
