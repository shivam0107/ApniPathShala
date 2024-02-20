import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils";
import { CiEdit, CiTimer } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { MdDeleteSweep } from "react-icons/md";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slices/courseSlice";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formatDate } from "../../../../services/formatDate";
import { useNavigate } from "react-router-dom";

const CoursesTable = ({ courses, setCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handelDeleteCourse = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };
  return (
    <div>
      <Table className="rounded-xl mt-5 border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                Courses not Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex  gap-x-10 border-richblack-800 p-6 border-[1px] "
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    className="h-[150px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between ">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <div className="flex px-2 text-richblack-700 font-semibold items-center w-fit rounded-full bg-pink-50 ">
                        <CiTimer />
                        <p className="">Draft</p>
                      </div>
                    ) : (
                      <div className="flex px-2 rounded-full items-center font-semibold text-richblack-500 w-fit bg-yellow-50">
                        <IoIosCheckmarkCircleOutline />
                        <p className="text-richblack-700">Published</p>
                      </div>
                    )}
                  </div>
                </Td>
                <Td> 2hr 30min</Td>
                <Td>₹{course?.price}</Td>
                <Td className="space-x-3">
                  <button
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    disabled={loading}
                  >
                    <CiEdit size={24} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "do you want to delete This Course",
                        text2:
                          "all the details about this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handelDeleteCourse(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    <MdDeleteSweep size={24} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
