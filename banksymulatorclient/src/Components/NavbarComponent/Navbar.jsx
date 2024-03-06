import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import "./Navbar.scss";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__title">
        Bank Symulator
      </Link>
      {user == null ? (
        <div className="navbar__links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="navbar__links">
          <Link to="/" onClick={handleLogout}>
            <IoIosLogOut />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
