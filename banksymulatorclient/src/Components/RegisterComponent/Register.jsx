import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";

function Register() {
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    name: "test",
    surname: "test",
    phoneNumber: "123456789",
    email: "test@wp.pl",
    password: "Kolo1212",
    birthDate: "2024-03-04T10:54:24.273Z",
    address: "yugyg sda  sda",
    pesel: "132685416",
  });

  const navigate = useNavigate();
  const validatePassword = (password) => {
    // At least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return strongPasswordRegex.test(password);
  };
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
    if (formData.password !== confirmPassword) {
      showNotification([{ message: "Passwords do not match", type: "error" }]);
      return;
    }
    if (!validatePassword(formData.password)) {
      showNotification([
        {
          message: "Password does not meet the strength requirements",
          type: "error",
        },
      ]);
      return;
    }
    try {
      const response = await axios.post("/api/Users/Register", formData);
      if (response.data.success) {
        navigate("/login");
        showNotification([
          { message: "Registered successfully", type: "info" },
        ]);
      } else {
        let notifications = response.errors.map((error) => {
          return { message: error, type: "error" };
        });
        showNotification(notifications);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        let notifications = err.response.data.errors.map((error) => {
          return { message: error, type: "error" };
        });
        showNotification(notifications);
      }
    }
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="registerWrapper">
      <form onSubmit={handleSubmit} className="registerWrapper__form">
        <div className="registerWrapper__form__formBlock">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <div className="registerWrapper__form__formBlock">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="birthDate">Birth date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label htmlFor="pesel">Pesel</label>
          <input
            type="text"
            name="pesel"
            value={formData.pesel}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
