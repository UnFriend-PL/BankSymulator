import { useContext, useState } from "react";
import { useAdminContext } from "../../Providers/AdminProvider/AdminProvider";
import "./AdminSearch.scss";
import { SearchField } from "../InputComponent/Input";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import apiService from "../../Services/ApiService";

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
    setSearchedUser,
  } = useAdminContext();
  const { getUser, setUserData } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  const hancdleOnChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    const result = await apiService(
      "get",
      `/api/Admin/GetUserInfo/${searchValue}`,
      null,
      getAdminToken()
    );
    if (result.success) {
      setSearchedUser(result.data);
      setUserData(result.data);
    }
  };

  const handleLoginAsAdmin = () => {
    setIsLoginAsAdmin(true);
    setAdminData(getUser());
  };
  const handleAdminLogout = () => {
    setIsLoginAsAdmin(false);
    setAdminData(null);
  };
  return (
    <div className={`adminSearch ${isSearchVisible ? "open" : ""}`}>
      {isLoginAsAdmin ? (
        <>
          <div className="adminSearch__panel__content">
            <SearchField
              inputName={"SearchUser"}
              inputLabel={"Search user"}
              inputValue={searchValue}
              onChange={hancdleOnChange}
              onSubmit={handleSubmit}
            ></SearchField>
            {
              <button
                className="adminSearch__panel__content__button"
                onClick={handleAdminLogout}
              >
                Logout from admin session
              </button>
            }
          </div>
        </>
      ) : (
        <>
          <div className="adminSearch__panel__content">
            <button
              className={`adminSearch__panel__content__button`}
              onClick={handleLoginAsAdmin}
            >
              Login as admin first
            </button>
          </div>
        </>
      )}

      <button
        className={`adminSearch__panel__title`}
        onClick={toggleSearchVisibility}
      >
        {isSearchVisible ? "Close" : "Search"}
      </button>
    </div>
  );
}
