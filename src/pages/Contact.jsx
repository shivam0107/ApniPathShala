import React from "react";
import { BiSolidChat ,BiSolidPhone } from "react-icons/bi";
import { LiaGlobeAfricaSolid } from "react-icons/lia";
import ContactForm from "../components/core/ContactUsPage/ContactForm";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const Contact = () => {
  return (
    <div className="">
      {/* section -1  */}
      <div className="flex flex-col md:flex-row justify-center gap-10 w-11/12 max-w-maxContent mx-auto mt-10 ">
        {/* contact details  */}
        <div className=" w-full md:w-[40%]">
          <ContactDetails />
        </div>

        {/* contact us form  */}

        <div className="w-[60%">
          <ContactForm />
        </div>
      </div>

      {/* section - 2 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer/>
    </div>
  );
};

export default Contact;
