import React, { useContext } from "react";
import "./HomeModule.scss";
import Accounts from "../../Components/AccountComponent/Accounts";
import { UserContext } from "../../Providers/UserProvider/UserContext";
function HomeModule() {
  const { getUser } = useContext(UserContext);
  if (getUser() == null) {
    return (
      <div id="Home">
        <div className="homeBlock">
          <h1>Welcome to our Bank Simulator!</h1>
          <p>This application allows you to:</p>
          <ul>
            <li>Manage your accounts</li>
            <li>Transfer funds between accounts</li>
            <li>View account history</li>
            <li>And much more!</li>
          </ul>
          <p>
            Please <a href="/login">log in</a> or{" "}
            <a href="/register">register</a> to start using these features.
          </p>
        </div>
        <div className="homeBlock"></div>
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
