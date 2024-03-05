import React, { useState } from "react";
import "./Transfer.scss";
import axios from "axios";
import ErrorNotification from "../ErrorNotificatioComponent/ErrorNotification";

function Transfer({ onClose, accountNumber }) {
  const [error, setErrors] = useState(null);
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
    try {
      const response = await axios.put("/api/Account/TransferAsync", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
      console.error(err);
    }
  };

  return (
    <div className="transferModal">
      {error && <ErrorNotification errors={error} />}
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
        <button type="submit">Submit</button>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default Transfer;
