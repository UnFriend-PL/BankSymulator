import React, { useContext, useState } from "react";
import "./Transfer.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";

function Transfer({ onClose, accountNumber }) {
  const { showNotification } = useContext(NotificationContext);

  const [formData, setFormData] = useState({
    fromAccountNumber: accountNumber,
    toAccountNumber: "",
    transferAmount: 0,
    transferType: "Standard",
    message: "Przelew Środków",
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
        <label>
          From Account Number:
          <input
            type="text"
            name="fromAccountNumber"
            value={formData.fromAccountNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          To Account Number:
          <input
            type="text"
            name="toAccountNumber"
            value={formData.toAccountNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Transfer Amount:
          <input
            type="number"
            name="transferAmount"
            value={formData.transferAmount}
            onChange={handleChange}
          />
        </label>
        <label>
          Transfer Type:
          <input
            type="text"
            name="transferType"
            value={formData.transferType}
            onChange={handleChange}
          />
        </label>
        <label>
          Message:
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Transfer</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Transfer;
