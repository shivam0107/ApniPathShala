const Section = require("../models/Section");

const Course = require("../models/Course");






exports.createSection = async (req, res) => {
    try {

        //data fetch
        const { sectionName, courseId } = req.body;


        //validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: console.log("all feilds are require", message.error),
            })
        }
        //create section 
        const newSection = await Section.create({ sectionName });
        //update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
          courseId,
          {
            $push: {
              courseContent: newSection._id,
            },
          },
          { new: true }
          //populate section as well as subsection
        )
          .populate("courseContent")
          .populate("subSection").exec(); 


        //return response
        return res.status(200).json({
            success: true,
            message: "section created successfully",
            updatedCourseDetails
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"unable to create section please try again",
        })
    }
}


//update a section

exports.updateSection = async (req, res) => {

 try {
   //data fecth
   const { sectionName, sectionId } = req.body;

   //validation
   if (!sectionName || !sectionId) {
     return res.status(400).json({
       success: false,
       message: console.log("all feilds are require", message.error),
     });
   }
   //update into db
   const section = await Section.findByIdAndUpdate(
     sectionId,
     { sectionName },
     { new: true }
   );

   //return res
   return res.status(200).json({
     success: true,
     message: "section updated successfully",
    
   });
 } catch (error) {
     return res.status(500).json({
       success: false,
       message: "unable to update section please try again",
     });
 }

}



//remove section

exports.deleteSection = async (req, res) => {
   try {
     //get id
     const { sectionId } = req.body;

     //delete
     const response = await Section.findByIdAndDelete(sectionId);

       //TODO: Do we need to delete entry from Course Schema
       
       
     //return res
     return res.status(200).json({
       success: true,
       message: "section deleted successfully",
      
     });
   } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to delete section please try again",
    });
   }
}