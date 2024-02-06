import React from "react";

const Spinner = () => {
  return (
    <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] justify-center items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
