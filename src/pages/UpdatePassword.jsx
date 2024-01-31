import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { setUser } from "../slices/profileSlice";
import Spinner from "../components/common/Spinner";
import { BiArrowBack } from "react-icons/bi";

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
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <Spinner className="" />
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new Password and Your'e all Set
          </p>
          <form onSubmit={handleOnSubmit}>
            <lable className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Enter Password Here"
                onChange={handleOnChange}
                className="form-style p-4 w-full rounded-md bg-richblack-800"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </lable>
            <lable className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Enter confirm Password Here"
                onChange={handleOnChange}
                className="form-style p-4 w-full rounded-md bg-richblack-800"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </lable>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
