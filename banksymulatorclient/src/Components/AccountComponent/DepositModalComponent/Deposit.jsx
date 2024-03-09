import React, { useContext, useState } from "react";
import "./Deposit.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";
import { UserContext } from "../../../Providers/UserProvider/UserContext";
function Deposit({ onClose, accountNumber }) {
  const { showNotification } = useContext(NotificationContext);
  const [isAccountOwner, setIsAccountOwner] = useState(true);
  const { getUser } = useContext(UserContext);
  const user = getUser();
  const [formData, setFormData] = useState({
    accountNumber: accountNumber,
    amount: 0,
    contributor: {
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
      pesel: user.pesel,
    },
  });
  console.log(formData);
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
    const result = await apiService(
      "put",
      "/api/Accounts/Deposit",
      formData,
      true
    );
    if (result.success === true) {
      showNotification([{ message: "Deposit successful", type: "info" }]);
    } else {
      showNotification(result);
    }
    onClose();
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
        <label htmlFor="accountOwner">
          <input
            type="checkbox"
            id="accountOwner"
            checked={isAccountOwner}
            onChange={() => setIsAccountOwner(!isAccountOwner)}
          />
          Account Owner
        </label>
        {!isAccountOwner && (
          <>
            <label htmlFor="name">Contributor Name:</label>
            <input
              name="name"
              onChange={handleChange}
              placeholder="Contributor Name"
              value={formData.contributor.name}
            />
            <label htmlFor="surname">Contributor Surname:</label>
            <input
              name="surname"
              onChange={handleChange}
              placeholder="Contributor Surname"
              value={formData.contributor.surname}
            />
            <label htmlFor="address">Contributor Address:</label>
            <input
              name="address"
              onChange={handleChange}
              placeholder="Contributor Address"
              value={formData.contributor.address}
            />
            <label htmlFor="email">Contributor Email:</label>
            <input
              name="email"
              onChange={handleChange}
              placeholder="Contributor Email"
              value={formData.contributor.email}
            />
            <label htmlFor="phoneNumber">Contributor Phone Number:</label>
            <input
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Contributor Phone Number"
              value={formData.contributor.phoneNumber}
            />
            <label htmlFor="pesel">Contributor PESEL:</label>
            <input
              name="pesel"
              onChange={handleChange}
              placeholder="Contributor PESEL"
              value={formData.contributor.pesel}
            />
          </>
        )}
        {isAccountOwner && (
          <>
            <label htmlFor="name">Contributor Name:</label>
            <span className="modal__value__noeditable" name="name">
              {user.name}
            </span>
            <label htmlFor="surname">Contributor Surname:</label>
            <span className="modal__value__noeditable" name="surname">
              {user.surname}
            </span>
            <label htmlFor="address">Contributor Address:</label>
            <span className="modal__value__noeditable" name="address">
              {user.address}
            </span>
            <label htmlFor="email">Contributor Email:</label>
            <span className="modal__value__noeditable" name="email">
              {user.email}
            </span>
            <label htmlFor="phoneNumber">Contributor Phone Number:</label>
            <span className="modal__value__noeditable" name="phoneNumber">
              {user.phoneNumber}
            </span>
            <label htmlFor="pesel">Contributor PESEL:</label>
            <span className="modal__value__noeditable" name="pesel">
              {user.pesel}
            </span>
          </>
        )}
        <button type="submit">Deposit</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Deposit;
