import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (notifications) => {
    console.log("showNotification", notifications);
    setNotification(notifications);
    setTimeout(() => setNotification(null), 10000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
