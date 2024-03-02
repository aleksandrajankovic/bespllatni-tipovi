import React from "react";
import { useDispatch } from "react-redux";
import { markTipAsSuccess, markTipAsFailed } from "../redux/features/tipSlice";

const TipStatus = ({ isSuccess, isFailed, _id, setIsSuccess, setIsFailed }) => {
  const dispatch = useDispatch();

  const handleSuccessChange = async () => {
    try {
      await dispatch(markTipAsSuccess(_id));
      setIsSuccess((prevState) => !prevState);
      localStorage.setItem(`success_${_id}`, !isSuccess);
      setIsFailed(false);
      localStorage.removeItem(`failed_${_id}`);
    } catch (error) {
      console.error("Failed to mark tip as success:", error);
    }
  };

  const handleFailedChange = async () => {
    try {
      await dispatch(markTipAsFailed(_id));
      setIsFailed((prevState) => !prevState);
      localStorage.setItem(`failed_${_id}`, !isFailed);
      setIsSuccess(false);
      localStorage.removeItem(`success_${_id}`);
    } catch (error) {
      console.error("Failed to mark tip as failed:", error);
    }
  };

  return (
    <>
      <div className="flex popup-text last">
        <img src="/settings-01.png" alt="" />
        <a href="#"> Status</a>
      </div>
      <div className="success-box">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="dobitnoCheckbox"
            checked={isSuccess}
            onChange={handleSuccessChange}
          />
          <label htmlFor="dobitnoCheckbox" className="flex">
            Dobitno
          </label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="gubitnoCheckbox"
            checked={isFailed}
            onChange={handleFailedChange}
          />
          <label htmlFor="gubitnoCheckbox" className="flex">
            Gubitno
          </label>
        </div>
      </div>
    </>
  );
};

export default TipStatus;
