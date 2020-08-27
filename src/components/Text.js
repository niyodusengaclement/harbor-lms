import React from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/components/text.scss";

export default ({ linkActiveStatus, label, linkAddress, linkLabel, className, exception }) => {
  return (
    <div className={className}>
      <span>{label}</span>
      <Link
        to={linkAddress}
        clicked={linkActiveStatus? ' ' :  null}
        exception={exception ? ' ' : null}
      >
        {linkLabel}
      </Link>
    </div>
  );
};
