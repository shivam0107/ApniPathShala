import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../services/operations/authAPI";

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  console.log("data" , formData);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(e) {
   e.preventDefault();
   dispatch(login(email, password, navigate));
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 pt-6 "
    >
      <lable className="w-full ">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
          Email Address<sup className=" text-pink-400 ">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter email id"
          name="email"
          className="bg-[#161D29] rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
      </lable>

      <lable className="w-full relative">
        <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
          Password<sup className=" text-pink-400 ">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter password"
          name="password"
          className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
        />

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[43px] cursor-pointer "
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="text-xs mt-1 max-w-max ml-auto text-blue-100 ">
            Forgot Password
          </p>
        </Link>
      </lable>

      <button type="submit" className="bg-yellow-400 rounded-[8px] font-medium text-slate-800 px-[12px] py-[8px] mt-6">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
