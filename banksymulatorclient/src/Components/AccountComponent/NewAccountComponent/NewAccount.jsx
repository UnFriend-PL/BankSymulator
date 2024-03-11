import React, { useContext, useState } from "react";
import "./NewAccount.scss";
import apiService from "../../../Services/ApiService";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import Input, { CheckBox, Select } from "../../InputComponent/Input";
function NewAccount({ refresh, onClose }) {
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    currency: "PLN",
    name: "Additional Account",
  });

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
    const result = await apiService(
      "post",
      "/api/Accounts/Create",
      formData,
      true
    );
    if (result.success === true) {
      showNotification([{ message: "Account created", type: "info" }]);
      refresh((prev) => !prev);
      onClose();
    } else {
      showNotification(result);
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <Select
          options={[
            { value: "PLN", label: "PLN" },
            { value: "EUR", label: "EUR" },
            { value: "USD", label: "USD" },
          ]}
          inputLabel={"Currency"}
          inputName={"currency"}
          inputValue={formData.currency}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Name"}
          inputPlaceholder={"Name"}
          inputName={"name"}
          inputValue={formData.name}
          onChange={handleChange}
        />
        <CheckBox
          inputLabel={"Joint Account"}
          inputName={"jointAccount"}
          inputValue={formData.jointAccount}
          onChange={handleChange}
        ></CheckBox>
        {formData.jointAccount ? <>
        </> : <></>}
        <button type="submit">Create Account</button>
        <button onClick={() => onClose()}>Cancel</button>
      </form>
    </div>
  );
}

export default NewAccount;
