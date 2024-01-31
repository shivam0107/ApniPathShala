import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn"
import { updateProfile } from "../../../../services/operations/SettingsAPI";



const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="flex flex-col  gap-10 mx-auto justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h1 className="text-richblack-25 text-xl font-semibold">
            Profile Information
          </h1>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* first name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstname" className="text-richblack-25">
                first Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="bg-[#161D29] rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            {/* last name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastname" className="text-richblack-25">
                last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-[#161D29] rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastname && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/*DOB  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateofbirth" className="text-richblack-25 lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateofbirth"
                id="dateofbirth"
                className=" form-style  bg-[#161D29] rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter DOB"
                {...register("dateOfBirth", {
                  required: { value: true },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of birth can not be in future",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateofbirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your date of birth.
                </span>
              )}
            </div>
            {/* gender name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-richblack-25">
                gender
              </label>
              <div>
                <select
                  type="text"
                  name="gender"
                  id="gender"
                  {...register("gender", { required: true })}
                  defaultValue={user?.additionalDetails?.gender}
                  className="bg-[#161D29] rounded-[0.5rem]  border border-richblack-50  text-richblack-5 w-full p-[12px]"
                >
                  {genders.map((element, index) => {
                    return <option key={index}>{element}</option>;
                  })}
                </select>
                {errors.gender && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your gender.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* contact no  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contact" className="text-richblack-25">
                Contact No..
              </label>
              <input
                type="number"
                name="contact"
                id="contact"
                className="bg-[#161D29] form-style rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter contact No"
                {...register("contactNumber", {
                  required: { value: true },
                  maxLength: { value: 12, message: "Invalid contact Number" },
                  minLength: { value: 10, message: "Invalid contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contact && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your contact No.
                </span>
              )}
            </div>
            {/* About  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-richblack-25">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                className="bg-[#161D29] rounded-[0.5rem] border border-richblack-50  text-richblack-5 w-full p-[12px]"
                placeholder="Enter About"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter About yourself.
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
         <IconBtn type="submit" text={"save"} />
        </div>
      </form>
    </>
  );
};

export default EditProfile;
