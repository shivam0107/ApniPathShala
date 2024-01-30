import React from 'react'
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const ContactDetails = () => {

    
const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];


  return (
    <div className=" bg-richblack-800 p-10 rounded-lg">
      {contactDetails.map((data, index) => {
        let Icon = Icon1[data?.icon] || Icon2[data?.icon] || Icon3[data?.icon];
        return (
          <div className="flex w-[80%] gap-4">
            <div>
              <Icon size={25} className="text-richblack-100" />
            </div>
            <div className="flex flex-col mb-4 text-richblack-100">
              <h2 className='text-white font-semibold'>{data?.heading}</h2>
              <p>{data?.description}</p>
              <p>{data?.details}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactDetails