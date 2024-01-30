import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <div className='flex flex-col justify-center items-center mb-4 '>
        <h1 className='text-3xl'>Get in Touch</h1>
        <p className='text-richblack-100'>We’d love to here for you, Please fill out this form.</p>
      </div>
      <div>
        <ContactUsForm />
      </div>

      

    </div>
  );
};

export default ContactFormSection