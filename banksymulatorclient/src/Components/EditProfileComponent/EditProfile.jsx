import React, { useContext, useState } from "react";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import axios from "axios";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
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

    try {
      const response = await axios.patch("/api/User/editUserData", editedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setUserData(editedUser);
        showNotification([{ message: "Profile updated", type: "info" }]);

        handleEdit();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        let notifications = error.response.data.errors.map((error) => {
          return { message: error, type: "error" };
        });
        showNotification(notifications);
        handleEdit();
      }
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
