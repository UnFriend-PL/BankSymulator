import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";
function Login() {
  const { setUserData } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Users/Login", formData);
      if (response.status == 200) {
        var result = response.data;
        localStorage.setItem("token", result.data.token);
        let user = {
          email: result.data.email,
          name: result.data.name,
          surname: result.data.surname,
          phoneNumber: result.data.phoneNumber,
          birthDate: result.data.birthDate,
          address: result.data.address,
          pesel: result.data.pesel,
        };
        setUserData(user);
      }
      navigate("/");
      showNotification([{ message: "Logged in successfully", type: "info" }]);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        let notifications = err.response.data.errors.map((error) => {
          return { message: error, type: "error" };
        });
        showNotification(notifications);
      }
      console.error(err);
    }
  };

  return (
    <div className="loginWrapper">
      <form onSubmit={handleSubmit} className="loginWrapper__form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
