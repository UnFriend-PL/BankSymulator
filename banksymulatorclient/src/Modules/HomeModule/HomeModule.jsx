import React, { useState } from "react";
import "./HomeModule.scss";

function HomeModule() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (token == null) {
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
  return <div id="Home"></div>;
}

export default HomeModule;
