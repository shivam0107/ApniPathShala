import React from "react";

import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

import timelineImg from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: logo1,
    heading: "Leadership",
    Description: "Fully commited to the successful company",
  },
  {
    Logo: logo2,
    heading: "Leadership",
    Description: "Fully commited to the successful company",
  },
  {
    Logo: logo3,
    heading: "Leadership",
    Description: "Fully commited to the successful company",
  },
  {
    Logo: logo4,
    heading: "Leadership",
    Description: "Fully commited to the successful company",
  },
];

function TimelineSection() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-16 items-center space-y-8">
        {/* hw dotted line banana hai */}

        <div className="md:w-[45%] flex flex-col ">
          {timeline.map((element, index) => {
            return (
              <div className="">
                <div className="flex flex-row gap-6 " key={index}>
                  <div className="w-[50px] h-[50px]  bg-white flex justify-center rounded-full items-center radius-[100%]">
                    <img src={element.Logo} />
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="font-semibold text-[18px]">
                      {element.heading}
                    </h2>
                    <p className="text-base">{element.Description}</p>
                  </div>
                </div>
                {index === timeline.length - 1 ? (
                  ""
                ) : (
                  <div className="w-[50px] h-[50px] flex justify-center items-center">
                    <div className="h-10 w-0 border-2 border-dashed text-pure-greys-50 "></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative  shadow-blue-200 shadow-[0px_0px_30px_0px] ">
          <img
            src={timelineImg}
            alt="timelineImage"
            className="shadow-white shadow-[15px_15px_0px_0px] object-cover h-[400px] lg:h-fitt"
          />
          <div
            className="absolute bg-caribbeangreen-700 flex flex-col sm:flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md"
          >
            <div className="flex flex-row gap-5 justify-center items-center  sm:border-r border-caribbeangreen-25 p-4 sm:px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-100 text-sm">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center p-4 sm:px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-100 text-sm">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
