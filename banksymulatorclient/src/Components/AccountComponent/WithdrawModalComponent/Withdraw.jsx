import React, { useState } from "react";
import axios from "axios";
import "./Withdraw.scss";

function Withdraw({ onClose, accountNumber }) {
  const [formData, setFormData] = useState({
    accountNumber: accountNumber,
    amount: 0,
  });
  const [errors, setErrors] = useState(null);
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
