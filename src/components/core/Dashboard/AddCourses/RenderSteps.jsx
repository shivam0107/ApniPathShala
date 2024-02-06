import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import { setStep } from "../../../../slices/courseSlice";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  console.log("step", step);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex justify-center  w- full ">
        {steps.map((item) => {
          return (
            <>
              <div className="flex flex-col items-center ">
                <button
                  className={` grid cursor-default  aspect-square rounded-full w-[34px] justify-center  place-items-center ${
                    step === item.id
                      ? "bg-yellow-900 border-yellow-50 text-yellow-50 "
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
                >
                  {step > item.id ? (
                    <FaCheck className="font-bold text-richblack-500" />
                  ) : (
                    item.id
                  )}
                </button>
              </div>
              {item.id !== steps.length && (
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-200"
                  } `}
                ></div>
              )}
            </>
          );
        })}
      </div>
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
    </>
  );
};

export default RenderSteps;
