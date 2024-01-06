const Razorpay = require("razorpay");


exports.instance = new Razorpay({
  key_id: "processs.env.RAZORPAY_KEY",
  key_secret: "processs.env.RAZORPAY_SECRET",
});