import React, { useContext, useEffect, useState } from "react";
import "./AccountHistory.scss";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../../Services/ApiService";
export default function AccountHistory({ accountNumber, currency, refresh }) {
  const [history, setHistory] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const handleCurrentPage = (e) => {
    if (e > totalPages || e < 1) return;
    setCurrentPage(e);
  };
  const pagination = (current, total) => {
    const center = [
        current - 2,
        current - 1,
        current,
        current + 1,
        current + 2,
      ],
      filteredCenter = center.filter((p) => p > 1 && p < total),
      includeThreeLeft = current === 5,
      includeThreeRight = current === total - 4,
      includeLeftDots = current > 5,
      includeRightDots = current < total - 4;

    if (includeThreeLeft) filteredCenter.unshift(2);
    if (includeThreeRight) filteredCenter.push(total - 1);

    if (includeLeftDots) filteredCenter.unshift("...");
    if (includeRightDots) filteredCenter.push("...");

    return [1, ...filteredCenter, total];
  };
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
        `/api/Accounts/History/${accountNumber}/${currentPage}/${itemsPerPage}`,
        undefined,
        true
      );
      if (result.success === true) {
        const sortedResponse = result.data.transactions.sort((a, b) => {
          return new Date(b.transferTime) - new Date(a.transferTime);
        });
        setTotalPages(result.data.totalPages);
        setHistory(sortedResponse);
      } else {
        showNotification(result);
      }
    };
    fetchData();
  }, [refresh, currentPage]);

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
              item.toAccountNumber === accountNumber ? "Incoming" : "Outcoming";
            return (
              <div key={index} className="accountHistory__item">
                <div
                  className={`accountHistory__item__kindOfTransfer ${kindOfTransfer}`}
                >
                  {kindOfTransfer}
                </div>
                <div className="accountHistory__item__amount">
                  {kindOfTransfer == "Incoming" ? "+" : "-"}
                  {kindOfTransfer == "Incoming"
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
                  {kindOfTransfer == "Incoming"
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
          <div className="accountHistory__page">
            <div className="accountHistory__page__buttons">
              {pagination(currentPage, totalPages).map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`accountHistory__page__item ${
                      item === currentPage ? "active" : ""
                    }`}
                    disabled={item === currentPage ? true : false}
                    onClick={() => handleCurrentPage(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <div className="accountHistory__page__current">
              {currentPage}/{totalPages}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
