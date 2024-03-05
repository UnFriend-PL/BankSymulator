import React, { useState } from "react";
import axios from "axios";
import "./NewAccount.scss";
function NewAccount({ refresh, onClose }) {
  const [currency, setCurrency] = useState("");

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/Account/CreateAdditionalAccountAsync",
        {
          currency,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      refresh((prev) => !prev);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="createAccountModal">
      <form onSubmit={handleSubmit}>
        <label>
          Currency:
          <input
            type="text"
            name="currency"
            placeholder="Currency PLN, USD, EUR, etc."
            value={currency}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Account</button>
        <button onClick={() => onClose()}>Close</button>
      </form>
    </div>
  );
}

export default NewAccount;
