import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { signUp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

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
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center ">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code hasbeen sent to you. Enter the code here
          </p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>

          <div>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="text-richblack-5 flex items-center gap-x-2">
                  <BiArrowBack /> Back to Login
                </p>
              </Link>
            </div>
            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="flex items-center text-blue-100 gap-x-2"
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
