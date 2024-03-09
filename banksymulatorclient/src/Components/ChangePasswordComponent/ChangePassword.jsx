import { useContext, useState } from "react";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";
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
        <label>Current Password:</label>
        <input type="password" name="currentPassword" onChange={handleChange} />
        <label>New Password:</label>
        <input type="password" name="newPassword" onChange={handleChange} />
        <label>Repeat New Password:</label>
        <input type="password" name="repeatPassword" onChange={handleChange} />
        <button type="submit">Change Password</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
