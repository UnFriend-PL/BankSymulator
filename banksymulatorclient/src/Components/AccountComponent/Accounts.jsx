import React, { useState, useEffect, useContext } from "react";
import "./Accounts.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewAccount from "./NewAccountComponent/NewAccount";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import Account from "./Account";
import { FaWallet } from "react-icons/fa";

function Accounts() {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openNewAccount, setOpenNewAccount] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
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
      try {
        const response = await axios.get("/api/Accounts/GetByUserToken", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setAccounts(response.data.data);
          let total = 0;
          response.data.data.forEach((element) => {
            total += element.balanceInPln;
          });
          setTotalBalance(total);
        }
      } catch (err) {
        console.error(err);
        showNotification([
          {
            message: "An error occurred while fetching account data.",
            type: "error",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, refresh]);

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
