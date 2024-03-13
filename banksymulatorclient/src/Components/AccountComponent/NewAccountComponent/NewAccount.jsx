import React, { useContext, useState } from "react";
import "./NewAccount.scss";
import apiService from "../../../Services/ApiService";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import Input, { CheckBox, Select } from "../../InputComponent/Input";
function NewAccount({ refresh, onClose }) {
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    currency: "PLN",
    name: "Additional Account",
  });
  const [isJointAccount, setIsJointAccount] = useState(false);

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
    if (!isJointAccount) {
      const result = await apiService(
        "post",
        "/api/Accounts/Create",
        formData,
        true
      );
      if (result.success === true) {
        showNotification([{ message: "Account created", type: "info" }]);
        refresh((prev) => !prev);
        onClose();
      } else {
        showNotification(result);
        onClose();
      }
    } else {
      const modifiedFormData = {
        accountDetail: {
          currency: formData.currency,
          name: formData.name,
        },
        jointEmail: formData.jointEmail,
        jointName: formData.jointName,
        jointSurname: formData.jointSurname,
        jointPesel: formData.jointPesel,
        jointPhoneNumber: formData.jointPhone,
        jointBirthDate: formData.jointBirthDate,
      };

      const result = await apiService(
        "post",
        "/api/Application/JointAccount",
        modifiedFormData,
        true
      );
      if (result.success === true) {
        showNotification([{ message: "Application created", type: "info" }]);
        refresh((prev) => !prev);
        onClose();
      } else {
        showNotification(result);
        onClose();
      }
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <Select
          options={[
            { value: "PLN", label: "PLN" },
            { value: "EUR", label: "EUR" },
            { value: "USD", label: "USD" },
            { value: "CZK", label: "CZK" },
            { value: "CHF", label: "CHF" },
            { value: "NOK", label: "NOK" },
          ]}
          inputLabel={"Currency"}
          inputName={"currency"}
          inputValue={formData.currency}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Name"}
          inputPlaceholder={"Name"}
          inputName={"name"}
          inputValue={formData.name}
          onChange={handleChange}
        />
        <CheckBox
          inputLabel={"Joint Account"}
          inputName={"jointAccount"}
          inputValue={isJointAccount}
          onChange={() => {
            setIsJointAccount(!isJointAccount);
          }}
        ></CheckBox>
        {isJointAccount ? (
          <>
            <Input
              inputLabel={"Joint Name"}
              inputName={"jointName"}
              inputValue={formData.jointName}
              onChange={handleChange}
              inputPlaceholder={"Joint Name"}
            ></Input>
            <Input
              inputLabel={"Joint Surname"}
              inputName={"jointSurname"}
              inputValue={formData.jointSurname}
              inputPlaceholder={"Joint Surname"}
              onChange={handleChange}
            ></Input>
            <Input
              inputType="date"
              inputLabel={"Joint Birth Date"}
              inputName={"jointBirthDate"}
              inputValue={formData.jointBirthDate}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Joint Pesel"}
              inputName={"jointPesel"}
              inputPlaceholder={"Joint Pesel"}
              inputValue={formData.jointPesel}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Joint Email"}
              inputName={"jointEmail"}
              inputPlaceholder={"Joint Email"}
              inputValue={formData.jointEmail}
              onChange={handleChange}
            ></Input>
            <Input
              inputLabel={"Joint Phone"}
              inputName={"jointPhone"}
              inputPlaceholder={"Joint Phone"}
              inputValue={formData.jointPhone}
              onChange={handleChange}
            ></Input>
          </>
        ) : (
          <></>
        )}
        <button type="submit">Create Account</button>
        <button onClick={() => onClose()}>Cancel</button>
      </form>
    </div>
  );
}

export default NewAccount;
