const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async (req, res) => {

    try {
      //fetch data

      const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

      //get user id
      const userId = req.user.id;
      //validate
      if (!contactNumber || !gender || !id) {
        return res.status(400).json({
          success: true,
          message: "all feilds are required",
        });
      }

      //find profile
      const userDetails = await User.findById({ userId });
      const profileId = userDetails.additionalDetails;
      const profileDetails = await Profile.findById(profileId);

      //update profile
      profileDetails.dateOfBirth = dateOfBirth;
      profileDetails.about = about;
      profileDetails.contactNumber = contactNumber;
      profileDetails.gender = gender;

      await profileDetails.save();

      //return resonse
      return res.status(200).json({
        success: true,
        message: "profile updated successfully",
        profileDetails,
      });
        
        
    } catch (error) {
        return res.status(500).json({
            success: true,
            message:console.log("error while updating profile" , error)
        })
    }

}


//delete account

exports.deleteAccount = async (req, res) => {
   try {
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
           message:"user deleted successfully",
       })
   } catch (error) {
       return res.status(500).json({
           success: false,
           message:console.log("error while deleting user" , error)
        })
   }

}


//get all details of user
exports.getAllCourses = async (req, res) => {
    try {
        //get id

        const id = req.user.id;

        //get all details

        const userDetails = await User.find(id).populate("additionalDetails").exec();

        //return res

        return res.status(200).json({
            success: true,
            message: "user details fetched successfully",
            userDetails
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:console.log("error while geting all User" , error)
        })
    }
}