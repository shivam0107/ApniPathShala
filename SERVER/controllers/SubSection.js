const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils");
const { findByIdAndDelete } = require("../models/Course");
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

      const updateSubsection = await Section.findByIdAndUpdate(
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
            message:"sub section creates successfully"
        })
    } catch (error) {
        return res.status(500).json({
          success: true,
          message: console.log("error while creating subSection" , message.error)
        });
    }
 
};


//HW: Update subSection

//verify jarur kar lena

exports.updateSubSection = async (req, res) => {
  try {
    //fetch data
    const { SubSectionId, title, description, timeDuration } = req.body;

    //validate
    if (!SubSectionId || !title || !description || timeDuration) {
      return res.status(400).json({
        success: false,
        message: "error while fetching data",
      });
    }

    //update entry

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      SubSectionId,
      {
        title: title,
        description: description,
        timeDuration: timeDuration,
      },
      { new: true }
    );

      //return res
      return res.status(200).json({
        success: true,
        message: "sub section updated successfully",
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


