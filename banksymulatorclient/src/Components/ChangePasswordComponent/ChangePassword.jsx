import { useContext, useState } from "react";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";
import Input from "../InputComponent/Input";
export default function ChangePasswordModal({ onClose }) {
  const { showNotification } = useContext(NotificationContext);
  const [changePasswordModel, setChangePasswordModel] = useState(null);
  const handleChange = (e) => {
    setChangePasswordModel({
      ...changePasswordModel,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (
      changePasswordModel.newPassword !== changePasswordModel.repeatPassword
    ) {
      showNotification([{ message: "Passwords do not match", type: "error" }]);
      return;
    }
    const passwordData = { ...changePasswordModel };
    passwordData.repeatPassword = undefined;
    const result = await apiService(
      "patch",
      "/api/Users/ChangePassword",
      passwordData,
      true
    );
    if (result.success === true) {
      changePasswordModel.newPassword = "";
      changePasswordModel.repeatPassword = "";
      showNotification([{ message: "Password changed", type: "info" }]);
      onClose();
    } else {
      showNotification(result);
      onClose();
    }
  };
  return (
    <div className="modal">
      <form onSubmit={handleChangePassword}>
        <Input
          inputLabel={"Current Password"}
          inputType="password"
          inputName="currentPassword"
          inputPlaceholder={"Current Password"}
          inputValue={changePasswordModel?.currentPassword}
          onChange={handleChange}
        />
        <Input
          inputLabel={"New Password"}
          inputType="password"
          inputName="newPassword"
          inputPlaceholder={"New Password"}
          inputValue={changePasswordModel?.newPassword}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Repeat New Password"}
          inputType="password"
          inputName="repeatPassword"
          inputPlaceholder={"Repeat New Password"}
          inputValue={changePasswordModel?.repeatPassword}
          onChange={handleChange}
        />
        <button type="submit">Change Password</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
