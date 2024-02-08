import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";

const PublishCourse = () => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setStep(2));
  };

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToCourses = () => {
    dispatch(resetCourseState());

    //navigate/dashboard/my-courses
  };

  const handelCodePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      //no updation in form
      //no need to make api call
      goToCourses();
      return;
    }

    //form update hua hai
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
   
    const result = await editCourseDetails(formData, token);


    console.log("result", result);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handelCodePublish();
  };

  return (
    <div className=" text-white rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700">
      <p className="text-2xl mb-3 ">Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public" className="">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="rounded-full h-4 w-4 text-center "
            />
            <span className="ml-3 text-center ">
              make this course as Public
            </span>
          </label>
        </div>

        <div className="flex justify-end  gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center rounded-md bg-richblack-300 px-4 "
          >
            {" "}
            Back
          </button>
          <IconBtn
            type="submit"
            disabled={loading}
            text={"save Changes"}
          ></IconBtn>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
