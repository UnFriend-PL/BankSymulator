import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import "./ProfileModule.scss";
import { MdEditSquare } from "react-icons/md";
import EditProfileModal from "../../Components/EditProfileComponent/EditProfile";
import ChangePasswordModal from "../../Components/ChangePasswordComponent/ChangePassword";
import { useAdminContext } from "../../Providers/AdminProvider/AdminProvider";

export function ProfileModule() {
  const { getUser, setUserData } = useContext(UserContext);
  const { getSearchedUser, isLoginAsAdmin, searchedUser } = useAdminContext();
  const [user, setUser] = useState(getUser());
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    isLoginAsAdmin && searchedUser ? setUser(searchedUser) : setUser(getUser());
  }, [searchedUser, isLoginAsAdmin]);

  const handleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
    const updatedUserData = getUser();
    setUser(updatedUserData);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };
  return (
    <div className="profile">
      <div className="profile__section">
        <div className="profile__section__title">
          Personal Data
          <MdEditSquare className="edit" onClick={handleEditProfile} />
          <div className="profile__section__title__line"></div>
        </div>
        <div className="profile__section__content">
          {isEditingProfile && (
            <EditProfileModal user={user} handleEdit={handleEditProfile} />
          )}
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              Email:
            </label>
            <span className="profile__section__content__item__value">
              {user.email}
            </span>
          </div>
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              First Name:
            </label>
            <span className="profile__section__content__item__value">
              {user.name}
            </span>
          </div>
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              Last Name:
            </label>
            <span className="profile__section__content__item__value">
              {user.surname}
            </span>
          </div>
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              BirthDay:
            </label>
            <span className="profile__section__content__item__value">
              {user.birthDate ? user.birthDate.split("T")[0] : ""}
            </span>
          </div>
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              Phone:
            </label>
            <span className="profile__section__content__item__value">
              {user.phoneNumber}
            </span>
          </div>
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              Address:
            </label>
            <span className="profile__section__content__item__value">
              {user.address}
            </span>
          </div>
          <div className="profile__section__content__item">
            <label className="profile__section__content__item__label">
              Pesel:
            </label>
            <span className="profile__section__content__item__value">
              {user.pesel}
            </span>
          </div>
        </div>
      </div>
      <div className="profile__section">
        {isChangingPassword && (
          <ChangePasswordModal onClose={handleChangePassword} />
        )}

        <div className="profile__section__title">
          Security
          <MdEditSquare className="edit" onClick={handleChangePassword} />
          <div className="profile__section__title__line"></div>
        </div>
      </div>
    </div>
  );
}
