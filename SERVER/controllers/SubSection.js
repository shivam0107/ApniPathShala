const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary }= require("../utils/imageUploader");
const Course = require("../models/Course");
require("dotenv").config();

//create subSection

exports.createSubSection = async (req, res) => {
    try {
      //ftech data
      const { sectionId, title, description, timeDuration } = req.body;

      //extract file video

      const video = req.files.videoFile;
      //validation
      if (!sectionId || !title || !description || !timeDuration) {
        return res.status(400).json({
          success: false,
          message: "error while fetching data",
        });
      }
      //upload video to cloudinary

      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      //create subSection

      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadDetails.secure_url,
      });
      //insert subsection into db

      const updatedSection = await Section.findByIdAndUpdate(
        sectionId,
        {
          $push: {
            subSection: SubSectionDetails._id,
          },
        },
        { new: true }
      ).populate("subSection").exec();
      //HW: log updated section here, after adding populate query

        //return res
        return res.status(200).json({
          success: true,
          message: "sub section creates successfully",
          Data: updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: console.log("error while creating subSection" , error)
        });
    }
 
};


//HW: Update subSection

//verify jarur kar lena

exports.updateSubSection = async (req, res) => {
  try {
    //fetch data
    const { SubSectionId, title, description} = req.body;

    //fetch subSection details
    const subSection = await SubSection.findById(SubSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message:"SubSection not Found",
      })
    }

    console.log("title: ", title);
    if (title) {
      subSection.title = title;
    }

    console.log("title: " ,description);

    if (description) {
      subSection.description = description;
    }

    if (req.files && req.files.videoFile !== undefined) {
      const video = req.files.videoFile;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`
    }


    //save into db
    await subSection.save();

      //return res
      return res.status(200).json({
        success: true,
        message: "sub section updated successfully",
        Data:subSection
      });

  } catch (error) {
    return res.status(500).json({
      success: true,
      message: console.log("error while updating subsection" , message,error)
    });
  }
}

//delete Subsection

//isko bhi verify kar lena

exports.deleteSubSection = async (req, res) => {
    try {
        //get id
        const { sectionId } = req.body;
        //delete subsection
        const response = await findByIdAndDelete(sectionId);
        // return res
        return res.status(200).json({
          success: true,
          message: "sub section deleted successfully",
        });
    } catch (error) {
         return res.status(500).json({
           success: true,
           message: console.log(
             "error while deleting subsection",
             message,
             error
           ),
         });
    }

}


