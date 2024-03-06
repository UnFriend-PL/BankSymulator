import React, { useState, useEffect, useContext } from "react";
import "./Accounts.scss";
import Deposit from "./DepositModalComponent/Deposit";
import Withdraw from "./WithdrawModalComponent/Withdraw";
import Transfer from "../TransferComponent/Transfer";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";

export default function Account({ account, onSuccess }) {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
  };
  function calculatePercentage(num) {
    return ((num / 3000) * 100).toFixed(2);
  }
  return (
    <div className="account">
      <div className="account__panel">
        <div className="account__panel__title">{account.name}</div>
        <div className="account__panel__buttons">
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
      <div className="account__balance">
        <div className="account__balance__amount">
          {account.balance} {account.currency}
        </div>
        <div className="account__balance__accountNumber">
          <span className="account__balance__accountNumber__title">
            Account Number:
          </span>
          <span className="account__balance__accountNumber__number">
            {account.accountNumber}{" "}
            <IoCopy className="copy" onClick={handleCopy} />
          </span>
        </div>
        <div className="account__balance__percentage">
          {calculatePercentage(account.balance)}%
        </div>
      </div>
    </div>
  );
}
