import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../redux/features/authSlice";

const VerifyComponent = () => {
  let { token } = useParams();
  const [verificationMessage, setVerificationMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(verifyAccount(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <h2>Account Verification</h2>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default VerifyComponent;
