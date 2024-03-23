import { useContext, useState } from "react";
import { useAdminContext } from "../../Providers/AdminProvider/AdminProvider";
import "./AdminSearch.scss";
import { Label, SearchField, SwitchButton } from "../InputComponent/Input";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import apiService from "../../Services/ApiService";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";

export default function AdminSearch() {
  const {
    isSearchVisible,
    toggleSearchVisibility,
    isLoginAsAdmin,
    setIsLoginAsAdmin,
    getAdminData,
    setAdminData,
    getAdminToken,
    getSearchedUser,
    searchedUser,
    setSearchedUser,
  } = useAdminContext();
  const { showNotification } = useContext(NotificationContext);

  const { getUser, setUserData } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  const hancdleOnChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    const result = await apiService(
      "get",
      `/api/Admin/User/${searchValue}`,
      null,
      getAdminToken()
    );
    if (result.success) {
      setSearchedUser(result.data);
      toggleSearchVisibility(false);
    } else {
      showNotification(result);
    }
  };

  const handleAdminMode = () => {
    isLoginAsAdmin ? setIsLoginAsAdmin(false) : setIsLoginAsAdmin(true);
    if (isLoginAsAdmin) {
      if (getAdminData() == null) {
        setAdminData(getUser());
      }
    } else {
      if (getAdminData() != null) {
        setUserData(getAdminData());
        setSearchedUser(null);
        setAdminData(null);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchedUser(null);
    setSearchValue("");
  };

  return (
    <div className={`adminSearch ${isSearchVisible ? "open" : ""}`}>
      <div className="adminSearch__panel__content">
        <SwitchButton
          isChecked={isLoginAsAdmin}
          onChange={handleAdminMode}
          label="Admin Mode"
        />
        {isLoginAsAdmin && (
          <>
            <SearchField
              inputName={"SearchUser"}
              inputLabel={"Search user"}
              inputValue={searchValue}
              onChange={hancdleOnChange}
              onSubmit={handleSubmit}
            ></SearchField>
            {searchedUser && (
              <>
                {searchedUser && (
                  <div className="adminSearch__panel__content__buttons">
                    <button
                      className="adminSearch__panel__content__buttons__clear"
                      onClick={handleClearSearch}
                    >
                      clear
                    </button>
                  </div>
                )}
                <div className="adminSearch__panel__content__title">
                  Found user Details:
                </div>
                <div
                  key={searchedUser.id}
                  className="adminSearch__panel__content__user"
                >
                  <Label inputLabel={"Name"} inputValue={searchedUser.name} />
                  <Label
                    inputLabel={"Surname"}
                    inputValue={searchedUser.surname}
                  />
                  <Label
                    inputLabel={"Address"}
                    inputValue={searchedUser.address}
                  />
                  <Label inputLabel={"Email"} inputValue={searchedUser.email} />
                  <Label inputLabel={"Pesel"} inputValue={searchedUser.pesel} />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <button
        className={`adminSearch__panel__title`}
        onClick={toggleSearchVisibility}
      >
        {isSearchVisible ? "Close" : "Admin"}
      </button>
    </div>
  );
}
