import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { updatePassword } from "../../../../services/operations/SettingsAPI";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import IconBtn from "../../../common/IconBtn";

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data);
    try {
        dispatch(updatePassword(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
    };
    
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    })

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="flex flex-col  gap-10 mx-auto justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h1 className="text-richblack-25 text-xl font-semibold">
            Update Password
          </h1>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* first name  */}
            <div className=" relative flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="oldPassword"
                className="text-richblack-25 lable-style"
              >
                current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                className="bg-[#161D29] rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter current Password"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px]  z-[10] cursor-pointer "
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            {/* last name  */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="text-richblack-25">
                Confirm Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="bg-[#161D29] rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter New Password"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer "
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5 gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;
