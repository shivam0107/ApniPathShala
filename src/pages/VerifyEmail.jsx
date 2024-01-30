import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { signUp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        confirmPassword,
        password,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="text-white flex items-center justify-center ">
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code hasbeen sent to you. Enter the code here</p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props}  className=" text-white bg-richblack-800" />
              )}
            />
            <button type="submit">Verify Email</button>
          </form>

          <div>
            <div>
              <Link to="/login">
                <p>Back to Login</p>
              </Link>
            </div>
            <button onClick={() => dispatch(sendOtp(signupData.email , navigate))}>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
