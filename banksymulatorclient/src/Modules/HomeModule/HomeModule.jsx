import React, { useContext } from "react";
import "./HomeModule.scss";
import Accounts from "../../Components/AccountComponent/Accounts";
import { UserContext } from "../../Providers/UserProvider/UserContext";
function HomeModule() {
  const { getUser } = useContext(UserContext);
  if (getUser() == null) {
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
    </div>
  );
}

export default HomeModule;
