import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../common/Spinner";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { FaCloudUploadAlt } from "react-icons/fa";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementsFeild from "./RequirementsFeild";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "../../../../common/IconBtn";
import { setStep } from "../../../../../slices/courseSlice";
import { setCourse } from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { addCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  const [courseCategories, setCourseCategories] = useState([]);

  console.log("course Categories" , courseCategories);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log("categories" , categories);
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // console.log("CourseCategory", courseCategories);

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log("changes after editing form values:", currentValues);
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  //   handle next button click
  const onSubmit = async (data) => {
    console.log("form data", data);

    if (editCourse) {
      const currentValues = getValues();
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log(data)
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        console.log("Edit Form data: ", formData);
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    console.log("type", data.coursePrice);

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);

    console.log("add form data", formData);
    console.log("token" , token);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <div className="text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div>
          <label htmlFor="courseTitle">
            Course Title<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enetr course Details"
            className="bg-[#161D29] rounded-[0.5rem] border  boredr-2 border-richblack-100 text-richblack-5 w-full p-[12px]"
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <span className="text-pink-300">course title is required</span>
          )}
        </div>

        {/* course short description  */}

        <div>
          <label htmlFor="courseShortDesc">
            Course course Short Description
            <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enetr Enter Description"
            className="bg-[#161D29] min-h-[130px]  rounded-[0.5rem] border  boredr-2 border-richblack-100 text-richblack-5 w-full p-[12px]"
            {...register("courseShortDesc", { required: true })}
          />
          {errors.courseShortDesc && (
            <span className="text-pink-300">
              course description is required
            </span>
          )}
        </div>

        {/* choose course price  */}

        <div className="relative">
          {" "}
          <label htmlFor="CoursePrice">
            Course Price<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="number"
            id="CoursePrice"
            placeholder={`   Enetr course price`}
            className="bg-[#161D29] rounded-[0.5rem]  !pl-12 border  boredr-2 border-richblack-100 text-richblack-5 w-full p-[12px]"
            {...register("coursePrice", {
              required: { value: true },
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-[65%] inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          {errors.CoursePrice && (
            <span className="text-pink-300">course title is required</span>
          )}
        </div>

        {/* select course category  */}

        <div className="relative">
          {" "}
          <label htmlFor="courseCategory">
            Course category<sup className="text-pink-200">*</sup>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            className="bg-richblack-800 border  boredr-2 border-richblack-100 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px]"
            {...register("courseCategory", {
              required: { value: true },
            })}
          >
            <option value="" disabled>
              Choose course category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <>
                  <option key={index} className="p-4">
                    {category.name}
                  </option>
                </>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="text-pink-300">course category is required</span>
          )}
        </div>

        {/* course tags  */}

        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          setValue={setValue}
          errors={errors}
          register={register}
          getValues={getValues}
        />

        {/* create a component for upload and showing preview of media of image type  */}

        {/* <div className="relative flex flex-col rounded-md justify-center items-center border border-richblack-50 ">
          <div className=" border mt-5 bg-richblack-900  p-3 aspect-square  rounded-full ">
            <FaCloudUploadAlt size={24} className="text-yellow-5" />
          </div>

          <label
            htmlFor="courseImage"
            className="text-yellow-50 cursor-pointer "
          >
            <span className="text-richblack-400">
              Drag and drop a image, or{" "}
            </span>
            Browse
            <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="file"
            id="courseImage"
            accept="image/jpg , image/jpeg , image/png"
            placeholder={`   Enetr course price`}
            className="bg-[#161D29] hidden rounded-[0.5rem] border  boredr-2 border-richblack-100 text-richblack-5 w-full p-[12px]"
            {...register("courseImage", {
              required: { value: true },
            })}
          />
          {errors.courseImage && (
            <span className="text-pink-300">course thumbnail required</span>
          )}
        </div> */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* benifits of the course  */}
        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
            Benefits of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full border-richblack-500 rounded-md border-2 bg-richblack-800"
          />
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* requirements / instruction  */}

        <RequirementsFeild
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        {/* next /button  */}
        {/* Next Button */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          <IconBtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
