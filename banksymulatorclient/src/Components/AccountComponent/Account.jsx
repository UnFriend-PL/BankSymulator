import React, { useState, useEffect, useContext } from "react";
import "./Account.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../Services/TokenService";
import Deposit from "./DepositModalComponent/Deposit";
import Withdraw from "./WithdrawModalComponent/Withdraw";
import NewAccount from "./NewAccountComponent/NewAccount";
import Transfer from "../TransferComponent/Transfer";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";

function Accounts() {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openNewAccount, setOpenNewAccount] = useState(false);
  const { showNotification } = useContext(NotificationContext);

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
      <div className="accountWrap__title">Accounts</div>
      <button onClick={() => setOpenNewAccount(true)}>
        Create New Account
      </button>
      {openNewAccount && (
        <NewAccount onClose={setOpenNewAccount} refresh={setRefresh} />
      )}
      {loading && <p>Loading...</p>}
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
        <button onClick={() => setShowDepositModal(true)}>
          <RiLuggageDepositFill />
        </button>
        <button onClick={() => setShowWithdrawModal(true)}>
          <BiMoneyWithdraw />
        </button>
        <button onClick={() => setShowTransferModal(true)}>
          <BiTransfer />
        </button>

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
          <Transfer
            onClose={() => {
              setShowTransferModal(false);
              onSuccess((prev) => !prev);
            }}
            accountNumber={account.accountNumber}
          />
        )}
      </div>
    </div>
  );
}
