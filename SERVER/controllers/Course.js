const { trusted } = require("mongoose");
const Course = require("../models/Course");

const Tag = require("../models/Tag");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//create cource handeler function

exports.createCource = async (req, res) => {
  try {
    //fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required",
      });
    }

    //check for instructor
    const userId = req.user.id;

    const instructorDetails = await User.findById(userId);
    console.log("instructor details", instructorDetails);

    //TODO: verify that userId and instructorDetails._id are same or different

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not find",
      });
    }

    //check given tag is valid or not
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "tag details not find",
      });
    }

    //upload image to cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
      price,
    });

    //update user , add the new course to the user schema of instructor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the tag schema
    await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //return res

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      message: "error while creating new course",
    });
  }
};

//get all cource handeler function

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "all course fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      message: "error while fetching courses",
    });
  }
};

//get course detailse

exports.getCourseDetails = async (req, res) => {
  try {
    //fetch data;
    const { course_id } = req.body;

    //validate
    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "invalid course id",
      });
    }

    //find course details

    const courseDetails = await Course.findById({ course_id })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path:"subSection",
        }
      }).exec();
    
    //validation

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message:`could not find course with course id ${course_id}`
      })
    }
    
    

    //return res
    return res.status(200).json({
      success: true,
      message: "course details fetched successfully",
    });
  } catch (error) {
    return res.ststus(500).json({
      success: false,
      message: "error while getting course details",
    });
  }
};
