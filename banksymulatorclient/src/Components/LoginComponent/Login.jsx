import { useState, useContext } from "react";
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

    const result = await apiService("post", "/api/Users/Login", formData);
    if (result.success === true) {
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
      navigate("/");
      showNotification([{ message: "Logged in successfully", type: "info" }]);
    } else {
      showNotification(result);
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
