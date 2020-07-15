import React from "react";
import { Alert } from "react-bootstrap";
import "../assets/styles/welcome.scss";

const WelcomeMessage = () => {
  return (
    <div>
      <Alert key="123" variant="success">
        <h2 className="display-block">REMS</h2>
        COMING SOON....
      </Alert>
    </div>
  );
};

export default WelcomeMessage;
