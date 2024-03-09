import { useContext, useState } from "react";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import axios from "axios";
export default function ChangePasswordModal({ onClose }) {
  const { showNotification } = useContext(NotificationContext);
  const [changePasswordModel, setChangePasswordModel] = useState(null);
  const handleChange = (e) => {
    setChangePasswordModel({
      ...changePasswordModel,
      [e.target.name]: e.target.value,
    });
    console.log(changePasswordModel);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (
        changePasswordModel.newPassword !== changePasswordModel.repeatPassword
      ) {
        showNotification([
          { message: "Passwords do not match", type: "error" },
        ]);
        return;
      }
      const passwordData = { ...changePasswordModel };
      passwordData.repeatPassword = undefined;
      const response = await axios.patch(
        "/api/Users/ChangePassword",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        showNotification([{ message: response.data.message, type: "info" }]);
        changePasswordModel.newPassword = "";
        changePasswordModel.repeatPassword = "";
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        let notifications = error.response.data.errors.map((error) => {
          return { message: error, type: "error" };
        });
        showNotification(notifications);
      }
    }
    onClose();
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
