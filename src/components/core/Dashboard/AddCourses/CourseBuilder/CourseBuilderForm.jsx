import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { CgAdd } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispacth = useDispatch();

  const [editSectionName, setEditSectionName] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  //form submit
  const onSubmit = async (data) => {
    setLoading(true);

    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    //update values
    // console.log("result", result);

    if (result) {
      dispacth(setCourse(result));
       setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loading false
    setLoading(false);
  };

  //cancel edit
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  //go back
  const goBack = () => {
    dispacth(setStep(1));
    dispacth(setEditCourse(true));
  };

  //got to next step
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("add atleast 1 section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least One lecture In each section");
      return;
    }

    //if everything is goood
    dispacth(setStep(3));
  };

  //handel edit section name
  const handelEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  // console.log("course", course);

  return (
    <div className="text-white">
      <p>course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* input section  */}
        <div className="">
          <label htmlFor="sectionName">
            Section Name <sup className="text-pink-100">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Enter Section name"
            {...register("sectionName", { required: true })}
            className="w-full bg-richblack-800 p-4 rounded-md border-richblack-300 border-2"
          />
          {errors.sectionName && <span>Section Name is Required</span>}
        </div>

        {/* section button  */}
        <div className="flex gap-5 mt-5">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
          >
            <CgAdd size={24} />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-richblack-300"
            >
              cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handelEditSectionName={handelEditSectionName} />
      )}

      <div className="flex justify-end gap-5 mt-5">
        <button onClick={goBack} className="rounded-md p-2 bg-richblack-500">
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <FaAngleRight />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
