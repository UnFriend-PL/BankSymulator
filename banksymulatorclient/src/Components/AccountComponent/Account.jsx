/**
 * Represents an individual account component.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.account - The account object.
 * @param {Function} props.onSuccess - The success callback function.
 * @param {number} props.totalBalance - The total balance of all accounts.
 * @param {Function} props.refresh - The refresh callback function.
 * @param {Function} props.handleSuccess - The success handler function.
 * @returns {JSX.Element} - The account component.
 */
import React, { useState, useEffect, useContext } from "react";
import "./Accounts.scss";
import Deposit from "./DepositModalComponent/Deposit";
import Withdraw from "./WithdrawModalComponent/Withdraw";
import Transfer from "./TransferComponent/Transfer";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import AccountHistory from "./AccountHistoryComponent/AccountHistory";
import { useAdminContext } from "../../Providers/AdminProvider/AdminProvider";

export default function Account({
  account,
  onSuccess,
  totalBalance,
  refresh,
  handleSuccess,
}) {
  /**
   * Adds thousands separator to a number.
   * @param {number} number - The number to format.
   * @returns {string} - The formatted number with thousands separator.
   */
  const addThousandsSeparator = (number) => {
    let numberString = number.toString();
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numberString;
  };
  const { isLoginAsAdmin } = useAdminContext();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { getUser } = useContext(UserContext);
  const user = getUser();

  /**
   * Copies the account number to the clipboard.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
  };

  /**
   * Calculates the percentage of the account balance compared to the total balance.
   * @param {number} num - The account balance.
   * @returns {number} - The percentage value.
   */
  function calculatePercentage(num) {
    return totalBalance ? ((num / totalBalance) * 100).toFixed(2) : 100;
  }

  return (
    <div className="account">
      <div className="account__panel">
        <div className="account__panel__title">
          {account.name}{" "}
          {!account.isActive && (
            <div className="warning">Account is inactive</div>
          )}
        </div>
        <div className="account__panel__buttons">
          {isLoginAsAdmin && (
            <button
              disabled={!account.isActive}
              onClick={() => setShowDepositModal(true)}
            >
              <RiLuggageDepositFill />
            </button>
          )}
          {isLoginAsAdmin && (
            <button
              disabled={!account.isActive}
              onClick={() => setShowWithdrawModal(true)}
            >
              <BiMoneyWithdraw />
            </button>
          )}
          <button
            disabled={!account.isActive}
            onClick={() => setShowTransferModal(true)}
          >
            <BiTransfer />
          </button>

          {showDepositModal && (
            <Deposit
              onClose={() => {
                setShowDepositModal(false);
                handleSuccess();
              }}
              accountNumber={account.accountNumber}
            />
          )}
          {showWithdrawModal && (
            <Withdraw
              onClose={() => {
                setShowWithdrawModal(false);
                handleSuccess();
              }}
              accountNumber={account.accountNumber}
            />
          )}
          {showTransferModal && (
            <Transfer
              onClose={() => {
                setShowTransferModal(false);
                handleSuccess();
              }}
              accountNumber={account.accountNumber}
            />
          )}
        </div>
        <div className="account__panel__owners">
          <div className="account__panel__owners__owner">{`${account.ownerName} ${account.ownerSurname}`}</div>
          {account.isJointAccount ? (
            <>
              <div className="account__panel__owners__owner">{`${account.jointOwnerName} ${account.jointOwnerSurname}`}</div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="account__balance">
        <div className="account__balance__amount">
          {addThousandsSeparator(account.balance.toFixed(2))} {account.currency}
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
          {calculatePercentage(account.balanceInPln)}%
          <span className="account__balance__percentage__line">
            of total balance
          </span>
        </div>
      </div>
      <div className="account__history">
        <AccountHistory
          accountNumber={account.accountNumber}
          currency={account.currency}
          refresh={refresh}
        ></AccountHistory>
      </div>
    </div>
  );
}
