import React, { useState, useEffect, useContext } from "react";
import "./Notification.scss";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import { FaTrash } from "react-icons/fa";

function Notification() {
  const { notification, setNotification } = useContext(NotificationContext);
  const handleClose = (index) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  if (!notification) return null;

  return (
    <div className="notification">
      {console.log(notification)}
      {notification.map((notify, index) => (
        <div key={index} className={`notification__message__${notify.type}`}>
          {notify.message}
          <div
            onClick={() => handleClose(index)}
            className="notification__close"
          >
            <FaTrash />
          </div>
        </div>
      ))}
    </div>
  );
}
export default Notification;
