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
    <form onSubmit={handleSubmit} className="depositModal">
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
