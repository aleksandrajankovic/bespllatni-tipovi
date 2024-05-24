import React from "react";

const TipStatusInfo = ({ isSuccess, isFailed }) => {
  return (
    <div>
      {(isSuccess || isFailed) && (
        <div>
          {isSuccess && (
            <div className="flex g1">
              <img className="statusImg" src="/CheckCircle.png" alt="success" />
              <p className="statusText" style={{ color: "#17BB00" }}>
                Dobitan
              </p>
            </div>
          )}
          {isFailed && (
            <div className="flex g1">
              <img className="statusImg" src="/XCircle.png" alt="failed" />
              <p className="statusText" style={{ color: "#D11101" }}>
                Gubitan
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TipStatusInfo;
