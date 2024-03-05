import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import ErrorNotification from "../ErrorNotificatioComponent/ErrorNotification";
import { UserContext } from "../../Providers/UserContext";
import { getUserEmail } from "../../Services/TokenService";
function Login() {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

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
      const response = await axios.post("/api/User/login", formData);
      if (response.status == 200) {
        var result = response.data;
        localStorage.setItem("token", result.data.token);
        setUser(getUserEmail());
      }
      await navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
      console.error(err);
    }
  };

  return (
    <div className="loginWrapper">
      <ErrorNotification errors={errors} /> {/* add this line */}
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
