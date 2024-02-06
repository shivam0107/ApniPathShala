import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RequirementsFeild = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);

  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const removeRequirements = (index) => {
    const updatedRequirement = [...requirementList];
    const value = updatedRequirement.filter((req, i) => i !== index);
    setRequirementList(value);
  };

  const handleInput = () => {
    if (requirement && requirementList.includes(requirement)) {
      toast.error("This Feild already added");
    }

    if (requirement && !requirementList.includes(requirement)) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("")
    }
  };

  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions);
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);

  return (
    <div className="flex flex-col items-start space-y-2">
      <label htmlFor={name} className="">
        {label}
        <sup className="text-pink-100">*</sup>
      </label>
      <input
        id={name}
        name={name}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        type="text"
        placeholder="Enter Requirements"
        className="bg-richblack-800 border  boredr-2 border-richblack-100 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px] focus:border-yellow-5  "
      />
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
      <button
        type="button"
        onClick={handleInput}
        className="ml-2 outline-none text-yellow-5 focus:outline-none"
      >
        Add
      </button>
      <div className="flex flex-wrap gap-2">
        {requirementList.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 text-gray-700 bg-yellow-600  px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeRequirements(index)}
              className="ml-2 outline-none focus:outline-none"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementsFeild;
