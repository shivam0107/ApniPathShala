import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import Spinner from "../../../common/Spinner";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      //pending
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      console.log("instructor data", instructorApiData);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }

      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };

    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudent = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="text-white">
      <div className=" ">
        <h1>Hi {user?.firstName}</h1>
        <h1>Let's start something new</h1>
      </div>

      {loading ? (
        <Spinner />
      ) : courses.length > 0 ? (
        <div className="flex flex-col ">
          <div>
            <div className="my-4 flex-col  justify-center space-y-3 space-x-4">
              <InstructorChart courses={instructorData} />

              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 gap-4 p-6">
                <p>Statistics</p>
                <div className="">
                  <p>Total Courses</p>
                  <p className="text-3xl">{courses.length}</p>
                </div>
                <div className="">
                  <p>Toatal Students</p>
                  <p className="text-3xl">{totalStudent}</p>
                </div>
                <div className="">
                  <p className="">Total Income</p>
                  <p className="text-3xl">₹{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-richblack-800 p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex flex-col w-full md:flex-row  items-start space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not Created any course yet</p>
          <Link to={"dashboard/add-course"}>Create Course</Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
