import React, { useContext, useState } from "react";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";
import Input from "../InputComponent/Input";
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
        <Input
          inputLabel={"Email"}
          inputName={"email"}
          inputValue={editedUser.email}
          inputPlaceholder={"Email"}
          onChange={handleChange}
        />
        <Input
          inputLabel={"First Name"}
          inputName={"name"}
          inputValue={editedUser.name}
          inputPlaceholder={"First Name"}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Last Name"}
          inputName={"surname"}
          inputValue={editedUser.surname}
          inputPlaceholder={"Last Name"}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Birthday"}
          inputType={"date"}
          inputName={"birthDate"}
          inputValue={editedUser.birthDate}
          inputPlaceholder={"Birthday"}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Phone"}
          inputType="tel"
          inputName={"phoneNumber"}
          inputValue={editedUser.phoneNumber}
          inputPlaceholder={"Phone"}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Address"}
          inputName={"address"}
          inputValue={editedUser.address}
          inputPlaceholder={"Address"}
          onChange={handleChange}
        />
        <Input
          inputLabel={"Pesel"}
          inputName={"pesel"}
          inputValue={editedUser.pesel}
          inputPlaceholder={"Pesel"}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <button onClick={handleEdit}>Cancel</button>
      </form>
    </div>
  );
}
