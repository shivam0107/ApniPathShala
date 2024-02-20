import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentsFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { setCourse } from "../slices/courseSlice";
import GetAvgRating, { convertSecondsToDuration } from "../utils";
import Footer from "../components/common/Footer";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Error from "./Error";
import RatingStars from "../components/common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import CourseAccordion from "../components/core/Course/courseAccordion";

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  // console.log("courseId", courseId);
  // console.log("tokenInPage", token);

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  //fetch course details
  useEffect(() => {
    const getCourseFulldetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("result", result);
        setCourseData(result);
      } catch (error) {
        console.log("could not fetch course details", error);
      }
    };

    getCourseFulldetails();
  }, [courseId]);

  //get avg review count
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.CourseDetails?.ratingAndReview
    );
    setAverageReviewCount(count);
  }, [courseData]);

  //total no of duration

  const [totalNoOfDuration, setTotalNoOfDuration] = useState();

  useEffect(() => {
    let totalDurationInSeconds = 0;
    courseData?.data?.courseContent?.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
      // console.log("duration", totalDurationInSeconds);
      totalDurationInSeconds = convertSecondsToDuration(totalDurationInSeconds);
    });
    setTotalNoOfDuration(totalDurationInSeconds);
  }, [courseData]);

  //get total no of lecture
  const [totalNoOflecture, setTotalNoOflecture] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
    });
    setTotalNoOflecture(lectures);
  }, [courseData]);

  //to update
  const handleBuyCourse = () => {
    if (token) {
      buyCourse([courseId], token, user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return <div>loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  console.log("CourseData", courseData);

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData?.data;

  console.log("courseContent", courseContent);

  return (
    <>
      <div className={`relative w-full bg-richblack-800 `}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount || 0}</span>
                {/* <RatingStars Review_Count={avgReviewCount} Star_Size={24} /> */}
                <span>{`(${ratingAndReview.length || 0} reviews)`}</span>
                <span>{`${studentEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem]  top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseData?.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8 text-white">
            <h1 className="text-2xl">What You will learn</h1>
            <div className="text-richblack-400">{whatYouWillLearn}</div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] mb-2">
              <div className="">
                <h1 className="text-2xl">Course Content</h1>
                <div className="border-[1px] border-richblack-300 rounded-md p-2">
                  <span>
                    {courseData?.data.courseContent.length} {`section's`} .
                  </span>
                  <span>
                    {totalNoOflecture} {`lecture(s)`} .
                  </span>
                  <span>{totalNoOfDuration}</span>
                </div>
              </div>
              <div className="flex  items-end justify-end  ">
                <p className="text-yellow-50">collapse all section</p>
              </div>
            </div>
            <div className="mb-4">
              {courseContent.map((course, index) => (
                <CourseAccordion
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseDetails;
