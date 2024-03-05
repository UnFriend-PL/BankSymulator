import React, { useState } from "react";
import axios from "axios";
import "./Deposit.scss";

function Deposit({ onClose, accountNumber }) {
  const [formData, setFormData] = useState({
    accountNumber: accountNumber,
    amount: 0,
    contributor: {
      name: "",
      surname: "",
      address: "",
      email: "",
      phoneNumber: "",
      pesel: "",
    },
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Object.keys(formData.contributor).includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        contributor: {
          ...prevState.contributor,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/Account/DepositAsync", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="accountNumber"
        value={accountNumber}
        onChange={handleChange}
        placeholder="Account Number"
      />
      <input
        name="amount"
        type="number"
        step={0.01}
        onChange={handleChange}
        placeholder="Amount"
        min={0}
      />
      <input
        name="name"
        onChange={handleChange}
        placeholder="Contributor Name"
      />
      <input
        name="surname"
        onChange={handleChange}
        placeholder="Contributor Surname"
      />
      <input
        name="address"
        onChange={handleChange}
        placeholder="Contributor Address"
      />
      <input
        name="email"
        onChange={handleChange}
        placeholder="Contributor Email"
      />
      <input
        name="phoneNumber"
        onChange={handleChange}
        placeholder="Contributor Phone Number"
      />
      <input
        name="pesel"
        onChange={handleChange}
        placeholder="Contributor PESEL"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Deposit;
