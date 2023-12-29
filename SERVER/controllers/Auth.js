
const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt");

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
           specialChars:false,
       })
       
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
           message:"otp sent successfully",
       })




   } catch (error) {
       console.log(error);
       return res.status(501).json({
           success: false,
           message:"Error occured while generating otp"
        })
   }

}



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
       
       const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
         // SORT otp in descending order based on created at Limit(1) select only one document
        console.log(recentOtp);
       
       //validate otp
       if (recentOtp.length == 0) {
            return res.status(400).json({
              success: false,
              message: "Otp not found",
            });
       } else if (recentOtp.otp !== otp) {
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
           contactNumber : null,
       })


       const user = await User.create({
           fisrtName,
           lastName,
           email,
           password,
           confirmPassword,
           accountType,
           contactNumber,
           additionalDetail: profileDetails._id,
           image:

       })

    //return response
       

   } catch (error) {
     return res.status(501).json({
       success: false,
       message: console.log("Error while registering user: " , error.message),
     });
   }

}




//login



//change password
