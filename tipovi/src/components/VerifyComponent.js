import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../redux/features/authSlice";

const VerifyComponent = () => {
  let { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(verifyAccount(token));
    }
  }, [dispatch, token]);
  const verificationMessage = useSelector(
    (state) => state.auth.verificationMessage
  );
  return (
    <div className="verify-box">
      <h2>Verifikacija</h2>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default VerifyComponent;
