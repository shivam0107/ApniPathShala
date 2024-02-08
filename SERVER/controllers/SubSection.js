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

      const video = req.files.video;
      //validation
      if (!sectionId || !title || !description) {
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
        timeDuration: `${uploadDetails.duration}`,
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
          data: updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error occured while creating subSection ${error.message}`
        });
    }
 
};


//HW: Update subSection

//verify jarur kar lena

exports.updateSubSection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, subSectionId, title, description } = req.body;

    //fetch subSection details
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "SubSection not Found",
      });
    }

    console.log("title: ", title);
    if (title !== undefined) {
      subSection.title = title;
    }

    console.log("description: ", description);

    if (description != undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    //save into db
    await subSection.save();

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    //return res
    return res.status(200).json({
      success: true,
      message: "sub section updated successfully",
      data: updatedSection,
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
        const { subSectionId, sectionId } = req.body;
        await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $pull: {
              subSection: subSectionId,
            },
          }
        );
        const subSection = await SubSection.findByIdAndDelete({
          _id: subSectionId,
        });

        if (!subSection) {
          return res
            .status(404)
            .json({ success: false, message: "SubSection not found" });
        }

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
          "subSection"
        );

        return res.json({
          success: true,
          message: "SubSection deleted successfully",
          data: updatedSection,
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


