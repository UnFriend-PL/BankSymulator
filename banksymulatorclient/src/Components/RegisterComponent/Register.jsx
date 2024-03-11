import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";
import Input from "../InputComponent/Input";

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
    const result = await apiService("post", "/api/Users/Register", formData);
    if (result.success === true) {
      navigate("/login");
      showNotification([{ message: "Registered successfully", type: "info" }]);
    } else {
      showNotification(result);
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
          <Input
            inputLabel={"Name"}
            inputName={"name"}
            inputValue={formData.name}
            inputPlaceholder={"Name"}
            onChange={handleChange}
          />
          <Input
            inputLabel={"Surname"}
            inputName={"surname"}
            inputPlaceholder={"Surname"}
            inputValue={formData.surname}
            onChange={handleChange}
          />
          <Input
            inputLabel={"Email"}
            inputType="email"
            inputName={"email"}
            inputPlaceholder={"Email"}
            inputValue={formData.email}
            onChange={handleChange}
          />
          <Input
            inputLabel={"Password"}
            inputType="password"
            inputPlaceholder={"Password"}
            inputName={"password"}
            inputValue={formData.password}
            onChange={handleChange}
          />
          <Input
            inputLabel={"Confirm password"}
            inputType="password"
            inputPlaceholder={"Confirm password"}
            inputName={"confirmPassword"}
            inputValue={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        <div className="registerWrapper__form__formBlock">
          <Input
            inputLabel={"Phone number"}
            inputPlaceholder={"Phone number"}
            inputType="tel"
            inputName={"phoneNumber"}
            inputValue={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            inputLabel={"Birth date"}
            inputPlaceholder={"Birth date"}
            inputType="date"
            inputName={"birthDate"}
            inputValue={formData.birthDate}
            onChange={handleChange}
          />
          <Input
            inputLabel={"Address"}
            inputPlaceholder={"Address"}
            inputName={"address"}
            inputValue={formData.address}
            onChange={handleChange}
          ></Input>
          <Input
            inputLabel={"Pesel"}
            inputPlaceholder={"Pesel"}
            inputName={"pesel"}
            inputValue={formData.pesel}
            onChange={handleChange}
          ></Input>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
