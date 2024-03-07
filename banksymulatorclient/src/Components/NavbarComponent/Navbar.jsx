import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import "./Navbar.scss";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { IoIosLogOut } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";

function Navbar() {
  const { getUser, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

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
        <div className="navbar__links">
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
      )}
    </nav>
  );
}

export default Navbar;
