import React, { useState, useEffect } from "react";
import "./Account.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../ErrorNotificatioComponent/ErrorNotification";
import { isTokenExpired } from "../../Services/tokenService";
import Deposit from "./DepositModalComponent/Deposit";
import Withdraw from "./WithdrawModalComponent/Withdraw";
import NewAccount from "./NewAccountComponent/NewAccount";
function Accounts() {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openNewAccount, setOpenNewAccount] = useState(false);
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
        setAccounts(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching account data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, refresh]);

  return (
    <div className="accountWrap">
      <div className="accountWrap__title">Accounts</div>
      <button onClick={() => setOpenNewAccount(true)}>
        Create New Account
      </button>
      {openNewAccount && (
        <NewAccount onClose={setOpenNewAccount} refresh={setRefresh} />
      )}
      {loading && <p>Loading...</p>}
      {error && <ErrorNotification errors={error} />}
      {accounts &&
        accounts.map((element, index) => (
          <Account key={index} account={element} onSuccess={setRefresh} />
        ))}
    </div>
  );
}

export default Accounts;

function Account({ account, onSuccess }) {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  return (
    <div className="account">
      <h2 className="account__title">{account.name}</h2>
      <p className="account__info">
        <span>Account Number:</span> {account.accountNumber}
      </p>
      <p className="account__info">
        <span>Balance:</span> {account.balance} {account.currency}
      </p>
      <div>
        <button onClick={() => setShowDepositModal(true)}>Deposit</button>
        <button onClick={() => setShowWithdrawModal(true)}>Withdraw</button>
        <button onClick={() => setShowTransferModal(true)}>Transfer</button>

        {showDepositModal && (
          <Deposit
            onClose={() => {
              setShowDepositModal(false);
              onSuccess((prev) => !prev);
            }}
            accountNumber={account.accountNumber}
          />
        )}
        {showWithdrawModal && (
          <Withdraw
            onClose={() => {
              setShowWithdrawModal(false);
              onSuccess((prev) => !prev);
            }}
            accountNumber={account.accountNumber}
          />
        )}
        {showTransferModal && (
          <TransferModal
            onClose={() => {
              setShowTransferModal(false);
              onSuccess((prev) => !prev);
            }}
          />
        )}
      </div>
    </div>
  );
}
