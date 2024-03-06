import React, { useState, useContext, useEffect } from "react";
import "./HomeModule.scss";
import Accounts from "../../Components/AccountComponent/Accounts";
import { UserContext } from "../../Providers/UserProvider/UserContext";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
function HomeModule() {
  const { user } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);

  const handleTest = () => {
    showNotification([{ message: "Hello, world!", type: "info" }]);
  };
  if (user == null) {
    return (
      <div id="Home">
        <h1>Welcome to Bank Symulator</h1>
        <p>
          This is a simple bank symulator. You can register and login to your
          account. You can also make a transfer, check your balance and see your
          transaction history.
        </p>
      </div>
    );
  }
  return (
    <div id="Home">
      <Accounts></Accounts>
      <button onClick={handleTest}> test</button>
    </div>
  );
}

export default HomeModule;
