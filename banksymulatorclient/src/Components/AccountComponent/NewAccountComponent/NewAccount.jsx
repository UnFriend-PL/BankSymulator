import React, { useState } from "react";
import axios from "axios";
import "./NewAccount.scss";
function NewAccount({ refresh, onClose }) {
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
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/Account/CreateAdditionalAccountAsync", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
            value={formData.currency}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
        <button onClick={() => onClose()}>Close</button>
      </form>
    </div>
  );
}

export default NewAccount;
