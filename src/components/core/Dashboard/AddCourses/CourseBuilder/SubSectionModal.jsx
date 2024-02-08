import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
  } = useForm();

  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (edit || view) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handelEditSubSection = async (data) => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.title) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.title) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    //api call

    const result = await updateSubSection(formData, token);
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      };
      dispatch(setCourse(updatedCourse));
      // console.log("courseIn Updated SubSection", course);
    }

    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes Made to the form");
      } else {
        //store edit kar do
        handelEditSubSection(data);
      }

      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    //add
    setLoading(true);
    //api CAll
    const result = await createSubSection(formData, token);
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm ">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div>
            <label>
              Lecture Title <sup className="text-pink-100">*</sup>{" "}
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full bg-richblack-800 p-4 rounded-md border-richblack-300 border-2"
            />
            {errors.lectureTitle && <span>Lecture Title is required</span>}
          </div>
          <div>
            <label>
              Lecture description<sup className="text-pink-100">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              {...register("lectureDesc", { required: true })}
              className="w-full  min-h-[130px] bg-richblack-800 p-4 rounded-md border-richblack-300 border-2"
            />
            {errors.lectureDesc && <span>Lecture description is required</span>}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
