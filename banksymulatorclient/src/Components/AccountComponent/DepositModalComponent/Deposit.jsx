import React, { useContext, useState } from "react";
import axios from "axios";
import "./Deposit.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";

function Deposit({ onClose, accountNumber }) {
  const { showNotification } = useContext(NotificationContext);
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
      if (response.data.success) {
        showNotification([{ message: "Deposit successful", type: "info" }]);
      }
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        let notifications = err.response.data.errors.map((error) => {
          return { message: error, type: "error" };
        });
        showNotification(notifications);
      }
      console.error(err);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label htmlFor="accountNumber">Account Number:</label>
        <input
          name="accountNumber"
          value={accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
        />
        <label htmlFor="amount">Amount:</label>
        <input
          name="amount"
          type="number"
          step={0.01}
          onChange={handleChange}
          placeholder="Amount"
          min={0}
        />
        <label htmlFor="name">Contributor Name:</label>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Contributor Name"
        />
        <label htmlFor="surname">Contributor Surname:</label>
        <input
          name="surname"
          onChange={handleChange}
          placeholder="Contributor Surname"
        />
        <label htmlFor="address">Contributor Address:</label>
        <input
          name="address"
          onChange={handleChange}
          placeholder="Contributor Address"
        />
        <label htmlFor="email">Contributor Email:</label>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Contributor Email"
        />
        <label htmlFor="phoneNumber">Contributor Phone Number:</label>
        <input
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Contributor Phone Number"
        />
        <label htmlFor="pesel">Contributor PESEL:</label>
        <input
          name="pesel"
          onChange={handleChange}
          placeholder="Contributor PESEL"
        />
        <button type="submit">Deposit</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Deposit;
