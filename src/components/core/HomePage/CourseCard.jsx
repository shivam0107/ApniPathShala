import React from 'react'
import { FaUserGroup } from "react-icons/fa6";
import { ImTree } from "react-icons/im";

function CourseCard({ key, cardData, currentCard, setCurrentCard }) {
    return (
      <div
        className={`w-[360px] lg:w-[30%] ${
          currentCard === cardData.heading
            ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
            : "bg-richblack-800"
        }  text-richblack-25 h-[300px] box-border cursor-pointer`}
        onClick={() => setCurrentCard(cardData?.heading)}
      >
        <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
          <div
            className={` ${
              currentCard === cardData?.heading && "text-richblack-800"
            } font-semibold text-[20px]`}
          >
            {cardData?.heading}
          </div>

          <div className="text-richblack-400">{cardData?.description}</div>
        </div>

        <div
          className={`flex justify-between ${
            currentCard === cardData?.heading
              ? "text-blue-300"
              : "text-richblack-300"
          } px-6 py-3 font-medium`}
        >
          {/* Level */}
          <div className="flex items-center gap-2 text-[16px]">
            <FaUserGroup />
            <p>{cardData?.level}</p>
          </div>

          {/* Flow Chart */}
          <div className="flex items-center gap-2 text-[16px]">
            <ImTree />
            <p>{cardData?.lessionNumber} Lession</p>
          </div>
        </div>
      </div>
      //   <div className="">
      //     <div className=" mx-auto">
      //       <h3>{cardData.heading}</h3>
      //       <div>
      //         This course covers the basic concepts of HTML including creating and
      //         structuring web pages, adding text, links, images, and more.
      //       </div>
      //       <div className="flex flex-row">
      //         <div>
      //           <FaUserGroup />
      //           <p>{cardData.level}</p>
      //         </div>
      //         <div>
      //           <ImTree />
      //           <p>{cardData.lessionNumber} Lession</p>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
    );
}

export default CourseCard