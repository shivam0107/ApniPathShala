import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import countryCode from "../../../data/countrycode.json";
import { ACCOUNT_TYPE } from "../../../utils";
import { setSignupData } from "../../../slices/authenticationSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import Tab from "../../common/Tab";

export const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //student or instructor

  const [accountType, SetAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setshowConfirmPassword] = useState(false);


  const { firstName, lastName, email, password, confirmPassword } = formData;

  console.log("email" , formData );

  //Handle input feilds, when some value change
  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  // console.log("Form data" , formData);

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    console.log("submitting form data...");
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    console.log("signup data"  , signupData);

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));

    // Send OTP to user for verification
    dispatch(sendOtp(email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    SetAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];



  const countries = countryCode.map((ctr, index) => ctr.country);

  const [country, setCountry] = useState();
  const [ctrCode, setCtrCode] = useState("+91");

  function handleOnchange(event) {
    setCountry(event.target.value);

    setCtrCode(
      countryCode.find((ctr) => ctr.country === event.target.value).code
    );
  }

  // console.log("ctr code", ctrCode);

  return (
    <div>
      {/* Student-instructor-tab */}
      <Tab tabData={tabData} field={accountType} setField={SetAccountType} />

      <form onSubmit={handleOnSubmit}>
        {/* first name - last name */}
        <div className="flex justify-between w-full mt-4">
          <lable>
            <p className="text-[0.87rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              First name <sup className=" text-[#EF476F] ">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstName}
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
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastName}
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

        <button type='submit' className="bg-[#FFD60A] w-full rounded-[8px] font-medium text-slate-800 px-[12px] py-[8px] transition-all duration-200  hover:scale-95 mt-6">
          create Account
        </button>
      </form>
    </div>
  );
};
