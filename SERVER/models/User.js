const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fisrtName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetail: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  cources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    required: true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
