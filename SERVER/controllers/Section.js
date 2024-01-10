const Section = require("../models/Section");

const Course = require("../models/Course");
const { findByIdAndUpdate } = require("../models/User");

exports.createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body;

    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // Create a new section with the given name
    const newSection = await Section.create({ sectionName });

    console.log(newSection);

    // Add the new section to the course's content array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return the updated course object in the response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: console.log(error),
    });
  }
};

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
      Data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to update section please try again",
    });
  }
};

//remove section

exports.deleteSection = async (req, res) => {
  try {
    //get id
    const { sectionId, courseId } = req.body;

    //verify kar lena isko
    //TODO: Do we need to delete entry from Course Schema
    //  const updatedCourse = await Course.findByIdAndUpdate(
    //    { _id: courseId },
    //    {
    //      $pull: {
    //        courseContent: courseId,
    //      },
    //    }
    //  );

    //delete
    const response = await Section.findByIdAndDelete(sectionId);

    //return res
    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
      //  Data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to delete section please try again",
      error: console.log(error),
    });
  }
};
