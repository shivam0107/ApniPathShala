import React from "react";
import CTAButton from "./Button";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
  blob
}) {
  return (
    <div
      className={` flex flex-col gap-5  ${position} my-20 w-[84%] justify-between  mx-auto`}
    >
      {/* code sectiorn -1 */}
      <div className=" w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-inter font-bold w-[85%] -mt-3">
          {subheading}
        </div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <p className="text-white">{ctabtn2.btnText}</p>
          </CTAButton>
        </div>
      </div>

      {/* code sectiorn 2 */}
      {/* home work bg gradient */}

      <div
        className={` relative h-fit code-border  flex ${backgroundGradient}  flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%]  lg:w-[470px]`}
      >
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            cursor
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
        <div className="absolute flex -mt-16 -ml-10 text-blue-100" >
          <img src={blob} />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
