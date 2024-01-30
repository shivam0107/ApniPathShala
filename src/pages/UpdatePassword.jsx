import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { setUser } from "../slices/profileSlice";

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();

  const { password, confirmPassword } = formData;

  const dispatch = useDispatch();

  function handleOnChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

    
    
  const handleOnSubmit = (e) => {
    e.preventDefault();
   const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
    };

    const {loading} = useSelector((state) => state.auth);
    console.log("loading", loading);
    
  return (
    <div className="text-richblack-25">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Choose new password</h1>
          <p>Almost done. Enter your new Password and Your'e all Set</p>
          <form onSubmit={handleOnSubmit}>
            <lable>
              <p>New Password</p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Enter Password Here"
                onChange={handleOnChange}
                className="form-style  bg-richblack-800"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className=" right-3 top-[43px] cursor-pointer "
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </lable>
            <lable>
              <p>Confirm New Password</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Enter confirm Password Here"
                onChange={handleOnChange}
                className="form-style  bg-richblack-800"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className=" right-3 top-[43px] cursor-pointer "
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </lable>

            <button type="submit">Reset Password</button>
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

export default UpdatePassword;
