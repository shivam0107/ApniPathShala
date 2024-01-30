const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

//reset password token

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    console.log(  "email", email);
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    return res.json({
      success: true,
      message:"Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};


//resetPassword

exports.resetPassword = async (req, res) => {
  try {
    //fetch password ,and confirm password , token

    const { password, confirmPassword, token } = req.body;

    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "password not matching",
      });
    }

    //get userdetail from db using token
    const userDetails = await User.findOne({ token: token });

    //if no entry Invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "token invalid",
      });
    }

    //token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "token is expired please regenerate token",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error while reset password: ${error.message}`,
    });
  }
};
