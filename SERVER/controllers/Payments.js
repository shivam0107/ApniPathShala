const { instance } = require("../config/razorpay")
const Course = require("../models/Course");

const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


//capture the payment and initiate the razorpay order


exports.capturePayment = async (req, res) => {
    try {

        //get user id and course id

        const { course_id } = req.body;
        const userId = req.user.id;

        //validation
       

        //valid course id
         if (!course_id) {
           return res.status(400).json({
             success: false,
             message: "please provide valid course id",
           });
        }
        
        //valid course detail
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.json({
                    success: false,
                    message:"could not find the course"
                })
            }

            //check already buy or not
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                 return res.status(200).json({
                    success: false,
                    message:"student is already enrolled"
                })
            }


        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "could not find the course"
            });
        }
        //valid user id

        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            reciept: Math.random(Date.now().toString),
            notes: {
                courseId: course_id,
                userId
            }

        }

        //create order

        try {
            //initiate the payment using razorpay

            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

             return res.status(200).json({
                 success: true,
                 courseName: course.courseName,
                 thumbnail: course.thumbnail,
                 courseDescription: course.courseDescription,
                 orderId: paymentResponse.id,
                 currency: paymentResponse.currency,
                 amount:paymentResponse.amount,
                 message: "order created successfully",
             });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message:"could not initiate order"
            })
        }
        
        
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"errror while capturing payment"
        })
    }
}



//verify signature

exports.verifySignature = async (req, res) => {
  
    const webhookSecret = "12345678";

    const signature = req.headers("x-razorpay-signature");
    
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));

    //whenever we used hashing algorithm we use special term [ digest ]-- that is hexadeciml format
    const digest = shasum.digest("hex");
    
    
    if (signature === digest) {
        console.log("payment autorized");

        const { courseId, userId } = req.ody.payload.payment.entity.notes;

        try {
            
            //fullfil the action
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        studentEnrolled:userId,
                    }
                },
                {new:true}
            )
            //validate res
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message:"course not found",
                })
            }

            console.log(enrolledCourse);

            //find the student and add course to list of enrolled course
            const enrolledStudent = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        courses:courseId
                    }
                },
                {new:true}
            )

            console.log(studentEnrolled);

            //mail send kardo confirmation wala
            const emailresponse = await mailSender(
                enrolledStudent.email,
                "congratulation from codehelp",
                "Congratulation you are onboarded into new course"
            )

            console.log(emailResponse);;
            return res.status(200).json({
                success: true,
                message:"signature verified and course added"
            })

            

        } catch (error) {
            return res.status(500).json({
                success: false,
                message:error.message,
             })
        }

    }
    else {
        return res.status(400).json({
            success: false,
            message:"invalid request"
        })
    }

     //

};