import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import CountryCode from '../../../data/countrycode.json'
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("logging  Data", data);
    try {
      setLoading(true);
       
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        {data}
      );

      if (response?.data?.success) {
        toast.success("Form Submitted SuccessFully");
      }
     
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="">
      <div className="flex flex-col gap-3">
        <div className="flex gap-5   ">
          {/* first name  */}
          <div className="flex flex-col gap-2  w-full ">
            <label htmlFor="firstname">
              first Name<sup className=" text-pink-400 ">*</sup>
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-pink-100">Please Enter Your Name</span>
            )}
          </div>
          {/* lastname */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="lastname">last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
              placeholder="Enter last name"
              {...register("lastname")}
            />
          </div>
        </div>

        {/* email  */}
        <div className="flex flex-col gap-2">
          <lable htmlFor="email">
            {" "}
            Email address<sup className=" text-pink-400 ">*</sup>
          </lable>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
            placeholder="Enter your Email Address"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-pink-100">Please Enter email</span>
          )}
        </div>

        {/* phone no  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber">
            Phone Number<sup className=" text-pink-400 ">*</sup>
          </label>
          <div className="flex flex-row gap-5">
            {/* dropdown */}
            <div className="w-[20%]">
              <select
                name="dropdown"
                id="dropdown"
                className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((element, index) => (
                  <option key={index} value={element.code}>
                    {element.code}-{element.country}
                  </option>
                ))}
              </select>
            </div>
            {/* phone no  */}
            <div className="w-full">
              <input
                type="number"
                id="phonenumber"
                name="phonenumber"
                placeholder="1234 4321"
                className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
                {...register("phonenumber", {
                  required: { value: true, message: "please Enetr phone no" },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
              {errors.phoneNo && (
                <span className="text-pink-100">{errors.phoneNo.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* message      */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message">
            message<sup className=" text-pink-400 ">*</sup>
          </label>
          <textarea
            name="message"
            id="message"
            className="bg-[#161D29] rounded-[0.5rem]  text-richblack-5 w-full p-[12px]"
            cols={30}
            rows={7}
            placeholder="Enter Your Message here"
            {...register("message", { required: true })}
          />
          {errors.email && (
            <span className="text-pink-100">Please Enter message</span>
          )}
        </div>

        {/* button  */}
        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
