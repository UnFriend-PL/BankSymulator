import React, { useContext, useState } from "react";
import axios from "axios";
import "./Withdraw.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";

function Withdraw({ onClose, accountNumber }) {
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    accountNumber: accountNumber,
    amount: 0,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/Account/WithdrawAsync", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        showNotification([{ message: "Withdraw successful", type: "info" }]);
        onClose();
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

  return (
    <form onSubmit={handleSubmit} className="withdraw-form">
      <input
        name="amount"
        type="number"
        onChange={handleChange}
        placeholder="Amount"
        step={0.01}
        className="withdraw-form__input"
      />
      <button type="submit" className="withdraw-form__button">
        Submit
      </button>
    </form>
  );
}

export default Withdraw;
