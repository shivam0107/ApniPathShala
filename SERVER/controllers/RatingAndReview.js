const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const Course = require("../models/Course");

exports.createRating = async (req, res) => {
  try {
    //fetch data
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    //validate data
    if (!rating || !review) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required",
      });
    }

    //check if user is enrolled or not
    const courseDetails = await Course.findOne(
      { _id: courseId },
      {
        studentEnrolled: { $elemMatch: { $eq: userId } },
      }
    );
    if (!courseDetails) {
      return res.status(500).json({
        success: false,
        message: "user not enrolled in this course",
      });
    }

    //check if user is already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      Course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "user have already reviewed the course",
      });
    }

    //create rating and review

    const ratingAndReviewDetails = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    //update course with this rating and review

    const updatedCourseDetail = await Course.findByIdAndUpdate(
      { courseId },
      {
        $push: {
          ratingAndReview: ratingAndReviewDetails._id,
        },
      },
      { new: true }
    );

    console.log(updatedCourseDetail);

    return res.status(200).json({
      success: true,
      message: "rating and review created successfully",
      ratingAndReviewDetails,
    });

    //return res
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get average rating
//aggregation seekhoge

exports.getAverageRating = async (req, res) => {
  try {
    //get course id
    const courseId = req.body.courseId;

    //calculate avg rating

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating reviews exist
    return res.status(200).json({
      success: true,
      message: "average rating is 0 no rating given till now",
      averageRating: 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all ratings

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: desc })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
          .exec();
      
      return res.status(200).json({
          success: true,
          message:"all reviews fetched successfully",
      })
      
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get rating based on course id
