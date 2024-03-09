import React, { useContext, useState } from "react";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";
export default function EditProfileModal({ user, handleEdit }) {
  const [editedUser, setEditedUser] = useState(user);
  const { setUserData } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);
  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await apiService(
      "patch",
      "/api/Users/Edit",
      editedUser,
      true
    );
    if (result.success === true) {
      setUserData(editedUser);
      showNotification([{ message: "Profile updated", type: "info" }]);
      handleEdit();
    } else {
      showNotification(result);
      handleEdit();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSave}>
        <label>Email:</label>
        <input name="email" value={editedUser.email} onChange={handleChange} />
        <label>First Name:</label>
        <input name="name" value={editedUser.name} onChange={handleChange} />
        <label>Last Name:</label>
        <input
          name="surname"
          value={editedUser.surname}
          onChange={handleChange}
        />
        <label>Birthday</label>
        <input
          type="date"
          name="birthDate"
          value={editedUser.birthDate}
          onChange={handleChange}
        ></input>
        <label>Phone:</label>
        <input
          name="phoneNumber"
          value={editedUser.phoneNumber}
          onChange={handleChange}
        />
        <label>Address:</label>
        <input
          name="address"
          value={editedUser.address}
          onChange={handleChange}
        />
        <label>Pesel:</label>
        <input name="pesel" value={editedUser.pesel} onChange={handleChange} />
        <button type="submit">Save</button>
        <button onClick={handleEdit}>Cancel</button>
      </form>
    </div>
  );
}
