import React, { useContext, useState } from "react";
import "./Withdraw.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";

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
    const result = await apiService(
      "put",
      "/api/Accounts/Withdraw",
      formData,
      true
    );
    if (result.success === true) {
      showNotification([{ message: "Withdraw successful", type: "info" }]);
      onClose();
    } else {
      showNotification(result);
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          name="amount"
          type="number"
          onChange={handleChange}
          placeholder="Amount"
          step={0.01}
        />
        <button type="submit">Withdraw</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Withdraw;
