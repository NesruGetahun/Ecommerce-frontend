import React from "react";
import "./LoadingSpinner.scss";
function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="wrapper">
        <div className="spin"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
