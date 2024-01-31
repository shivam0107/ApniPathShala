import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FiEdit } from "react-icons/fi";
import { formattedDate } from "../../../utils";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  console.log("user", user);

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">MyProfile</h1>

      {/* section - 1 */}
      <div className="flex items-center gap-10 mx-auto justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex gap-2">
          <img
            src={user?.image}
            alt={`profile-${user?.firstname}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <FiEdit />
        </IconBtn>
      </div>

      {/* section - 2  */}

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full gap-4  items-center justify-between">
          <p className="text-lg  font-semibold text-richblack-5">About</p>
          <IconBtn
            text="edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <FiEdit />
          </IconBtn>
        </div>

        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "write something about yourself"}
        </p>
      </div>

      {/* section - 3  */}

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full gap-4  items-center justify-between">
          <p className="text-lg  font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <FiEdit />
          </IconBtn>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-20 ">
            <div>
              <p className="text-richblack-600">First Name</p>
              <p className="text-richblack-25">{user?.firstName}</p>
            </div>
            <div>
              <p className="text-richblack-600">Last Name</p>
              <p className="text-richblack-25">{user?.lastName}</p>
            </div>
          </div>
          <div className="flex space-x-20 ">
            <div>
              <p className="text-richblack-600 ">Email</p>
              <p className="text-richblack-25 text-sm">{user?.email}</p>
            </div>
            <div>
              <p className="text-richblack-600">Phone Number</p>
              <p className="text-richblack-25">
                {user?.additionalDetails?.contactNumber ?? "add contact no"}
              </p>
            </div>
          </div>
          <div className="flex space-x-20 ">
            <div>
              <p className="text-richblack-600">Gender</p>
              <p className="text-richblack-25">
                {user?.additionalDetails?.gender ?? "add gender"}
              </p>
            </div>

            <div>
              <p className="text-richblack-600">Date of Birth</p>
              <p className="text-richblack-25">
                {(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
