import React from "react";
import HighLightText from "./HighLightText";
import progress from "../../../assets/Images/Know_your_progress.png";
import compare from "../../../assets/Images/Compare_with_others.png";
import lession from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from '../../core/HomePage/Button'

function LearningLanguageSection() {
  return (
    <div className="mt-[130px] mb-20" >
      <div className="  flex flex-col gap-5 items-center  justify-center mt-24 ">
        <h1 className="text-4xl text-center font-bold font-inter">
          Your swiss knife for{" "}
          <span>
            <HighLightText text={"learning any language"} />
          </span>{" "}
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <p className="w-[60%] text-center">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img src={progress} alt="" className="object-contain  lg:-mr-32 " />
          <img
            src={compare}
            alt=""
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            src={lession}
            alt=""
            className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />
        </div>
        {/* <div className="flex flex-col lg:flex-row items-center justify-center left-[-28%]  relative mt-3">
        <div className="object-contain">
          <img src={progress} alt="Know your Progress" />
        </div>
        <div className="absolute translate-x-[75%] translate-y-[-10%]">
          <img src={compare} alt="compare with others" />
        </div>
        <div className="absolute   translate-x-[140%] mt-[-10%]">
          <img src={lession} alt="Plan your lession" />
        </div>
      </div> */}

        <div className="w-fit mx-auto lg:mb-20 mb-8 mt-10">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="">Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default LearningLanguageSection;
