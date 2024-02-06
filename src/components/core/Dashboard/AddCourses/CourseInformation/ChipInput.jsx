import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ChipInput = ({
  label,
  getValues,
  setValue,
  placeholder,
  errors,
  name,
  register,
}) => {
  //   const [inputValue, setInputValue] = useState("");
  const { editCourse, course } = useSelector((state) => state.course);
  const [tags, setTags] = useState([]);

  //   const handleInputChange = (e) => {
  //     setInputValue(e.target.value);
  //   };

//   console.log("shivam");
//   console.log("tag", tags);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      //   console.log("key down value", e.target.value);
      e.preventDefault();

      const value = e.target.value.trim();
      if (tags.includes(value)) {
        toast.error("This Tag Already Added");
      }
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setTags(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div className="flex flex-col items-start space-y-2">
      <label htmlFor={name} className="">
        {label}
        <sup className="text-pink-100">*</sup>
      </label>
      <input
        id={name}
        name={name}
        type="text"
        // onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className="bg-richblack-800 border  boredr-2 border-richblack-100 rounded-[0.5rem] text-richblack-25 prevent w-full p-[12px] focus:border-yellow-5  "
      />
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 text-gray-700 bg-yellow-600  px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
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

export default ChipInput;
