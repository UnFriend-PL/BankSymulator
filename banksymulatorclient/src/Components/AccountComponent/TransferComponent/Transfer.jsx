import React, { useContext, useState } from "react";
import "./Transfer.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";
import Input, { Select } from "../../InputComponent/Input";

function Transfer({ onClose, accountNumber }) {
  const { showNotification } = useContext(NotificationContext);

  const [formData, setFormData] = useState({
    fromAccountNumber: accountNumber,
    toAccountNumber: "",
    transferAmount: 0,
    transferType: "Standard",
    message: "Funds Transfer",
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
      "put",
      "/api/Accounts/Transfer",
      formData,
      true
    );
    if (result.success === true) {
      showNotification([{ message: "Transfer successful", type: "info" }]);
      onClose();
    } else {
      showNotification(result);
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <Input
          inputLabel={"Source Account"}
          inputPlaceholder={"Source Account"}
          inputName={"fromAccountNumber"}
          inputValue={formData.fromAccountNumber}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Destination Account"}
          inputPlaceholder={"Destination Account"}
          inputName={"toAccountNumber"}
          inputValue={formData.toAccountNumber}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Transfer Amount"}
          inputPlaceholder={"Transfer Amount"}
          inputName={"transferAmount"}
          inputValue={formData.transferAmount}
          inputType="number"
          step={0.01}
          min={0.01}
          onChange={handleChange}
        />
        <Select
          inputLabel={"Transfer Type"}
          inputName={"transferType"}
          inputValue={formData.transferType}
          onChange={handleChange}
          options={[
            { value: "Standard", label: "Standard" },
            { value: "Express", label: "Express" },
          ]}
        />
        <Input
          inputLabel={"Message"}
          inputPlaceholder={"Message"}
          inputName={"message"}
          inputValue={formData.message}
          onChange={handleChange}
        />
        <button type="submit">Transfer</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Transfer;
