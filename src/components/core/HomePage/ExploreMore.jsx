import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";

import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);

    const result = HomePageExplore.filter((course) => course.tag === value);

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="relative">
      <div className="text-4xl text-center  p-3 text-white font-semibold">
        Unloack the <HighLightText text={"Power of Coder"} />
      </div>

      <p className="text-white text-center font-medium  ">
        Learn to Build Anything You Can Imagine
      </p>

      {/* Tab section  */}
      <div className="hidden mb-5 mt-2 lg:flex flex-col md:flex-row w-max mx-auto  bg-richblack-800 rounded-md md:rounded-full gap-5 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] ">
        {tabsName.map((element, index) => {
          return (
            <div
              className={` text-[16px] flex flex-row items-center gap-2 
                            ${
                              currentTab === element
                                ? "bg-richblack-900 text-white font-medium"
                                : "text-richblack-200"
                            } px-8 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]"> </div>

      <div className="lg:absolute gap-10 w-[90%] justify-center items-center lg:gap-0 flex lg:justify-between flex-wrap lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

      {/* //my code */}
      {/* 
      <div className="lg:h-[150px] absolute flex flex-row mx-auto  justify-center  ">
        {courses.map((course, index) => {
          return (
            <div className=" mx-auto">
              <h3>{course.heading}</h3>
              <div>
                This course covers the basic concepts of HTML including creating
                and structuring web pages, adding text, links, images, and more.
              </div>
              <div className="flex flex-row">
                <div>
                  <FaUserGroup />
                  <p>{course.level}</p>
                </div>
                <div>
                  <ImTree />
                  <p>{course.lessionNumber} Lession</p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default ExploreMore;
