const { findByIdAndUpdate } = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    //fetch data

    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    //get user id
    const userId = req.user.id;
    //validate
    // if (!contactNumber || !gender) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "all feilds are required",
    //   });
    // }

    //find profile
    const userDetails = await User.findById({ _id: userId });
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    const user = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
    });
    await user.save();

    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;

    await profileDetails.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    //return resonse
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      
    });
  }
};

//delete account

exports.deleteAccount = async (req, res) => {
  try {

    console.log("PRINTING ID", req.user.id);

    //get id
    const id = req.user.id;

    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //TODO: HW unroll user user from all enrolled courses

    //delete user

    await User.findByIdAndDelete({ _id: id });

    // response

    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: console.log("error while deleting user", error),
    });
  }
};

//get all details of user
exports.getAllUserDetails = async (req, res) => {
  try {
    //get id

    const id = req.user.id;

    //get all details

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    //return res

    return res.status(200).json({
      success: true,
      message: "user details fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: console.log("error while geting all User", error),
    });
  }
};

//update profile picture

exports.updateDisplayPicture = async (req, res) => {
  try {
    //get image
    const displayPicture = req.files.displayPicture;

    //get user id
    const userId = req.user.id;

    //upload to cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);

    //update
    const updatedProfile = await User.findByIdAndUpdate(
      { _id:userId },
      { image: image.secure_url },
      {new:true}
    );

    //return res
    return res.status(200).json({
      success: true,
      message: "image updated successfully",
      data:updatedProfile
      })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while updating profile picture",
    });
  }
};
