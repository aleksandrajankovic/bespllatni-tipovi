import React from "react";

const TipStatusInfo = ({ isSuccess, isFailed }) => {
  return (
    <div>
      {(isSuccess || isFailed) && (
        <div>
          {isSuccess && (
            <div className="flex">
              <img src="/CheckCircle.png" alt="success" />
              <p style={{ color: "#17BB00" }}>Dobitan</p>
            </div>
          )}
          {isFailed && (
            <div className="flex">
              <img src="/XCircle.png" alt="failed" />
              <p style={{ color: "#D11101" }}>Gubitan</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TipStatusInfo;
