import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ color: "red", marginTop: "1rem" }}>
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;