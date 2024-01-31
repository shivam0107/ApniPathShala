const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile")
const  {passwordUpdated} = require("../mail/templates/passwordUpdate")

//send otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req body
    const { email } = req.body;

    //check if user already exist
    const checkUserPresent = await User.findOne({ email });

    //if user already exist then send response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate otp

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated: ", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //create entry in db
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
      success: true,
      message: "otp sent successfully",
      OTP:otp
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Error occured while generating otp",
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    //data fetch from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //validate karlo

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }

    //password match karlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    //check user already exist or not

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    //find most recent otp stored for the user

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // SORT otp in descending order based on created at Limit(1) select only one document
    console.log(recentOtp);



    //validate otp
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Otp not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      //invalid otp
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //entry create in db

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      accountType:accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //return response
    return res.status(200).json({
      success: true,
      message: "user is registered Successfully",
      user,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: console.log("Error while registering user: ", error.message),
    });
  }
};

//login

exports.login = async (req, res) => {
  try {
    //fetch email and password
    const { email, password } = req.body;

    //validation data

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the details carefully",
      });
    }
    //user check does exist or not

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: true,
        message: "user does not exist Please registered first",
      });
    }

    //generate jwt token and match password
    console.log("user" , user);
    console.log("password is this: ", password);
    console.log("hashed password is this: ",user.password);

if (await bcrypt.compare(password , user.password)) {
  const token = jwt.sign(
    { email: user.email, id: user._id, accountType: user.accountType },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  user.token = token;
  user.password = undefined;

  //create cookie

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(200).json({
    success: true,
    token,
    user,
    message: "Logged in successfully",
  });
} else {
  return res.status(400).json({
    success: false,
    message: "Incorrect Password Please fill correct password",
  });
}
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: console.log("Error while login" , error),
    });
  }
};

//change password : HomeWork
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
