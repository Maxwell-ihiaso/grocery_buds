import React from "react";

const Alert = ({ alert }) => {
  const { msg, status } = alert;
  return (
    <div className={`alert alert-${status}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
