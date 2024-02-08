import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import { FaPlus } from "react-icons/fa";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthCourses = async () => {
      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }
    };

    fecthCourses();
  }, []);

  return (
    <div className="text-white">
      <div className="text-white">
        <h1 className="text-white">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <FaPlus />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
