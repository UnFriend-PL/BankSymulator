import React, { useState, useEffect, useContext } from "react";
import "./Accounts.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../Services/TokenService";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token") === null) {
          navigate("/login");
          return;
        }
        if (await isTokenExpired()) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "/api/Account/GetAccountsByUserIdAsync",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setAccounts(response.data.data);
          let total = 0;
          response.data.data.forEach((element) => {
            total += element.balance;
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
        <div className="accountWrap__section__title">Accounts</div>
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
        accounts.map((element, index) => (
          <Account
            key={index}
            account={element}
            totalBalance={totalBalance}
            onSuccess={setRefresh}
          />
        ))}
    </div>
  );
}

export default Accounts;
