import React, { useState, useEffect, useContext } from "react";
import "./Accounts.scss";
import { useNavigate } from "react-router-dom";
import NewAccount from "./NewAccountComponent/NewAccount";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import Account from "./Account";
import { FaWallet } from "react-icons/fa";
import apiService from "../../Services/ApiService";
import { useAdminContext } from "../../Providers/AdminProvider/AdminProvider";

function Accounts() {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openNewAccount, setOpenNewAccount] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
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
  const addThousandsSeparator = (number) => {
    let numberString = number.toString();
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numberString;
  };
  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = isLoginAsAdmin
        ? "/api/Admin/Accounts/GetByUser"
        : "/api/Accounts/GetByUserToken";
      const result = await apiService("get", endpoint, null, true);

      if (result.success === true) {
        setAccounts(result.data);
        let total = 0;
        result.data.forEach((element) => {
          total += element.balanceInPln;
        });
        setTotalBalance(total);
        setLoading(false);
      } else {
        showNotification(result);
      }
    };

    fetchData();
  }, [navigate, refresh, isLoginAsAdmin]);

  return (
    <div className="accountWrap">
      <div className="accountWrap__section">
        <div className="accountWrap__section__title">
          <span className="accountWrap__section__title__text">Accounts</span>
          <div className="accountWrap__section__title__totalBalance">
            <span className="accountWrap__section__title__totalBalance__text">
              Total balance:
            </span>
            <span className="accountWrap__section__title__totalBalance__balance">
              {addThousandsSeparator(totalBalance.toFixed(2))} PLN
            </span>
          </div>
        </div>

        <button
          className="accountWrap__section__button"
          onClick={() => setOpenNewAccount(true)}
        >
          <FaWallet className="accountWrap__section__svg" />
          Open New Account
        </button>
        {openNewAccount && (
          <NewAccount onClose={setOpenNewAccount} refresh={setRefresh} />
        )}
      </div>

      {loading && <p>Loading...</p>}
      {accounts &&
        accounts.map((element) => (
          <Account
            key={element.accountNumber}
            account={element}
            totalBalance={totalBalance}
            refresh={refresh}
            handleSuccess={handleSuccess}
          />
        ))}
    </div>
  );
}

export default Accounts;
