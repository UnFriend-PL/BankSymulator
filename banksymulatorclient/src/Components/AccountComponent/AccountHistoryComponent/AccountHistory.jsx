import React, { useContext, useEffect, useState } from "react";
import "./AccountHistory.scss";
import axios from "axios";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";
export default function AccountHistory({ accountNumber, currency, refresh }) {
  const [history, setHistory] = useState([]);

  const { showNotification } = useContext(NotificationContext);
  const [showHistory, setShowHistory] = useState(false);
  const addThousandsSeparator = (number) => {
    let numberString = number.toString();
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numberString;
  };
  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await apiService(
        "get",
        `/api/Accounts/History/${accountNumber}`,
        undefined,
        true
      );
      if (result.success === true) {
        const sortedResponse = result.data.sort((a, b) => {
          return new Date(b.transferTime) - new Date(a.transferTime);
        });
        setHistory(sortedResponse);
      } else {
        showNotification(result);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <div className="accountHistory__button" onClick={handleShowHistory}>
        History
      </div>
      {showHistory && (
        <div className="accountHistory">
          <div className="accountHistory__item">
            <div className="accountHistory__item__headline kindOfTransaction">
              Kind of Transaction
            </div>
            <div className="accountHistory__item__headline amount">Amount</div>
            <div className="accountHistory__item__headline message">
              Message
            </div>
            <div className="accountHistory__item__headline counterparty">
              Counterparty
            </div>
            <div className="accountHistory__item__headline balanceAfterOperation">
              Balance After Operation
            </div>
            <div className="accountHistory__item__headline date">Date</div>
          </div>
          {history.map((item, index) => {
            let kindOfTransfer =
              item.toAccountNumber === accountNumber ? "Income" : "Outcome";
            return (
              <div key={index} className="accountHistory__item">
                <div
                  className={`accountHistory__item__kindOfTransfer ${kindOfTransfer}`}
                >
                  {kindOfTransfer}
                </div>
                <div className="accountHistory__item__amount">
                  {kindOfTransfer == "Income" ? "+" : "-"}
                  {kindOfTransfer == "Income"
                    ? addThousandsSeparator(item.transferAmount.toFixed(2))
                    : addThousandsSeparator(
                        item.sourceCurrencyTransferAmount.toFixed(2)
                      )}{" "}
                  {currency}
                </div>
                <div className="accountHistory__item__message">
                  {item.message}
                </div>
                <div className="accountHistory__item__counterparty">
                  {kindOfTransfer == "Income"
                    ? item.fromAccountNumber
                    : item.toAccountNumber}
                </div>
                <div className="accountHistory__item__balanceAfterOperation">
                  {item.balanceAfterOperation.toFixed(2)} {currency}
                </div>

                <div className="accountHistory__item__date">
                  {`${item.transferTime.split("T")[0]} ${item.transferTime
                    .split("T")[1]
                    .split(".")[0]
                    .split(":")
                    .slice(0, -1)
                    .join(":")}`}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
