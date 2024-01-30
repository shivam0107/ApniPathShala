import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI'
import { setLoading } from '../slices/authenticationSlice';

function ForgotPassword() {

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const  handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));

  }


// console.log("loading"  , loading);



  return (
    <div className="text-white  flex justify-center items-center ">
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset Your Email" : "Check Email"}</h1>
          <p>
            {!emailSent
              ? " Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : ` We have sent the reset email to ${email} `}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address<sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Your Email Here"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-style w-full bg-richblack-800"
                />
              </label>
            )}

            <button type="submit">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword