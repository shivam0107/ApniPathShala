import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { setCourse } from "../../../../../slices/courseSlice";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

const NestedView = ({ handelEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState();
  const [viewSubSection, setViewSubSection] = useState();
  const [editSubSection, setEditSubSection] = useState();

  const [confirmationModal, setConfirmationModal] = useState();

  //handel delete section
  const handelDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handelDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
      },
      token
    );

    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="text-white ">
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8 mt-5"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          <details key={section._id}>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  className=""
                  onClick={() =>
                    handelEditSectionName(section._id, section.sectionName)
                  }
                >
                  <CiEdit size={24} className="" />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "delete This section",
                      text2: "all the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handelDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <MdOutlineDeleteSweep size={24} className="" />
                </button>
                <span>|</span>
                <BiDownArrow />
              </div>
            </summary>

            <div className="ml-8">
              {section?.subSection.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-cenetr justify-between gap-x-3 border-b-2 "
                >
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data?.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      className=""
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <CiEdit size={24} className="" />
                    </button>
                    <button
                      className=""
                      onClick={() => {
                        setConfirmationModal({
                          text1: "delete This Sub section",
                          text2: "selected lectures will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handelDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <MdOutlineDeleteSweep size={24} className="" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-4 flex items-center gap-x-2 text-yellow-25"
              >
                Add Lecture
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NestedView;
