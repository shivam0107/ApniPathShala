const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//reset password token

exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const email = req.body;

    //check user for this email, email validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "your email is not registered",
      });
    }

    //token create
    const token = crypto.randomUUID();

    //user update by adding token and expiration time
    const updatedDetails = User.findByIdAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    //send email containing url

    await mailSender(
      email,
      "Password reset Link",
      `password reset Link : ${url}`
    );

    //return res

    return res.json({
      success: true,
      message: "email sent successfully, please check email and password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while reset password",
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
          const userDetails = await user.findOne({ token: token });

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
          const hashedPassword = bcrypt.hash(password, 10);

          //update password
          await User.findByIdAndUpdate(
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
            success: true,
            message: "error while reset password",
          });

            
        }
};


