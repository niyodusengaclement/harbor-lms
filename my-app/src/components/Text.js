import React, { useState } from "react";
import "../assets/styles/components/text.scss";
import getHashLocation from "../helpers/getHashLocation";
import compareString from "../helpers/compareString";

export default ({ location, label, linkAddress, linkLabel, className }) => {
  const [linkActiveStatus, setLinkActiveStatus] = useState(null);
  const handleClick = () => {
    setLinkActiveStatus(true);
  };
  return (
    <div className={className}>
      <span>{label}</span>
      <a
        href={linkAddress}
        onClick={handleClick}
        clicked={linkActiveStatus? ' ' :  null}
      >
        {linkLabel}
      </a>
    </div>
  );
};
