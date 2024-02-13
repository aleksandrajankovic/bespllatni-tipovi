import React from "react";

const Popup = ({ children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
