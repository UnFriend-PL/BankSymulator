import React, { useContext, useState } from "react";
import "./Deposit.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";
import { UserContext } from "../../../Providers/UserProvider/UserContext";
import Input, { CheckBox, Label } from "../../InputComponent/Input";
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
        <Label inputLabel={"Account Number"} inputValue={accountNumber}></Label>
        <Input
          inputLabel={"Amount"}
          inputName={"amount"}
          inputPlaceholder={"109.50"}
          inputValue={formData.amount}
          inputType="number"
          onChange={handleChange}
          step={0.01}
          min={0}
        ></Input>
        <CheckBox
          inputName={"accountOwner"}
          inputLabel={"Contributor is an account owner"}
          inputValue={isAccountOwner}
          onChange={() => setIsAccountOwner(!isAccountOwner)}
        />
        {!isAccountOwner && (
          <>
            <Input
              inputLabel={"Contributor Name"}
              inputName={"name"}
              inputPlaceholder={"Contributor Name"}
              inputValue={formData.contributor.name}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Contributor Surname"}
              inputName={"surname"}
              inputPlaceholder={"Contributor Surname"}
              inputValue={formData.contributor.surname}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Contributor Address"}
              inputName={"address"}
              inputPlaceholder={"Contributor Address"}
              inputValue={formData.contributor.address}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Contributor Email"}
              inputName={"email"}
              inputPlaceholder={"Contributor Email"}
              inputType="email"
              inputValue={formData.contributor.email}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Contributor Phone Number"}
              inputName={"phoneNumber"}
              inputType="tel"
              inputPlaceholder={"Contributor Phone Number"}
              inputValue={formData.contributor.phoneNumber}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Contributor PESEL"}
              inputName={"pesel"}
              inputType="number"
              inputPlaceholder={"Contributor PESEL"}
              inputValue={formData.contributor.pesel}
              onChange={handleChange}
            ></Input>
          </>
        )}
        {isAccountOwner && (
          <>
            <Label
              inputLabel={"Contributor Name"}
              inputValue={user.name}
            ></Label>
            <Label
              inputLabel={"Contributor Surname"}
              inputValue={user.surname}
            ></Label>
            <Label
              inputLabel={"Contributor Address"}
              inputValue={user.address}
            ></Label>
            <Label
              inputLabel={"Contributor Email"}
              inputValue={user.email}
            ></Label>
            <Label
              inputLabel={"Contributor Phone Number"}
              inputValue={user.phoneNumber}
            ></Label>
            <Label
              inputLabel={"Contributor PESEL"}
              inputValue={user.pesel}
            ></Label>
          </>
        )}
        <button type="submit">Deposit</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Deposit;
