import React, { useContext, useEffect, useState } from "react";
import "./AccountHistory.scss";
import axios from "axios";
import { NotificationContext } from "../../../Providers/NotificationProvider/NotificationProvider";
export default function AccountHistory({ accountNumber }) {
  const [history, setHistory] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/Account/GetAccountHistoryAsync/${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const sortedResponse = response.data.data.sort((a, b) => {
          return new Date(b.transferTime) - new Date(a.transferTime);
        });
        setHistory(sortedResponse);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          let notifications = error.response.data.errors.map((error) => {
            return { message: error, type: "error" };
          });
          showNotification(notifications);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="accountHistory">
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
              {item.transferAmount} {item.currency}
            </div>
            <div className="accountHistory__item__date">
              {item.transferTime}
            </div>
          </div>
        );
      })}
    </div>
  );
}
