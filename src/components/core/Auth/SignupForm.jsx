import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import countryCode from '../../../data/countrycode.json'

import Select from "react-dropdown-select";

export const SignupForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber:""
  });

  const countries = countryCode.map((ctr, index) => (
    ctr.country
  ))


  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [AccountType, SetAccountType] = useState("student");

  const [country, setCountry] = useState();
  const [ctrCode, setCtrCode] = useState("+91");

  function handleOnchange(event) {
    setCountry(event.target.value)
   
      setCtrCode(countryCode.find(ctr => ctr.country ===  event.target.value).code)
  }

    console.log("ctr code" , ctrCode);


  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("password do not match");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Account created");
    const accountData = {
      ...formData,
    };

    const finalData = {
      ...accountData,
      AccountType,
    };

    console.log("printing final account data");
    console.log(finalData);

    navigate("/dashboard");
  }

  return (
    <div>
      {/* Student-instructor-tab */}
      <div className="flex bg-richblack-700 p-1 gap-x-1 my-6 rounded-full max-w-max">
        <button
          className={`${
            AccountType === "student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-25 prevent"
          } py-2 px-5 rounded-full transition-all duration-200 `}
          onClick={() => SetAccountType("student")}
        >
          Student
        </button>
        <button
          className={`${
            AccountType === "Instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-25 prevent"
          } py-2 px-5 rounded-full transition-all duration-200 `}
          onClick={() => SetAccountType("Instructor")}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler}>
        {/* first name - last name */}
        <div className="flex justify-between w-full mt-4">
          <lable>
            <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              First name <sup className=" text-[#EF476F] ">*</sup>
            </p>
            <input
              required
              type="text"
              name="FirstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.FirstName}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
            />
          </lable>

          <lable>
            <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              Last name <sup className=" text-[#EF476F] ">*</sup>
            </p>
            <input
              required
              type="text"
              name="LastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.LastName}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
            />
          </lable>
        </div>

        {/* email add */}
        <div className="mt-[20px]"></div>
        <lable className="w-full mt-4 ">
          <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
            Email Address <sup className=" text-[#EF476F] ">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email Address"
            value={formData.email}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
          />
        </lable>
        {/* phone number  */}
        <div className="mt-5">
          <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
            Country <sup className=" text-[#EF476F] ">*</sup>
          </p>
          <div className="flex flex-col gap-3">
            <select
              onClick={handleOnchange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
            >
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              {countries.map((ctr, index) => (
                <option value={ctr}>{ctr}</option>
              ))}
            </select>
            <div className="flex justify-between">
              <div>
                <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
                  Country Code <sup className=" text-[#EF476F] ">*</sup>
                </p>
                <div className=" bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]">
                  {ctrCode}
                </div>
              </div>
              <div>
                <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
                  Phone Number <sup className=" text-[#EF476F] ">*</sup>
                </p>
                <input
                  required
                  type="tel"
                  name="phoneNumber"
                  onChange={changeHandler}
                  placeholder="Enter Your Phone No..."
                  value={formData.phoneNumber}
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* create password - confirm password */}
        <div className="mt-[20px]"></div>
        <div className="flex gap-x-5 mt-4">
          <lable className="relative w-full">
            <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              create password <sup className=" text-[#EF476F] ">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter password"
              value={formData.password}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
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
          </lable>

          <lable className="w-full relative">
            <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              confirm password <sup className=" text-[#EF476F] ">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
            />

            <span
              onClick={() => setshowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer "
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </lable>
        </div>
        <div className="mt-[20px]"></div>

        <button className="bg-[#FFD60A] w-full rounded-[8px] font-medium text-slate-800 px-[12px] py-[8px] mt-6">
          create Account
        </button>
      </form>
    </div>
  );
};
