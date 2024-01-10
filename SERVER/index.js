const express = require("express");
const app = express();

//route import
const courseRoutes = require("./routes/Course")
const profileRoutes = require("./routes/Profile")
const userRoutes = require("./routes/User")
const paymentRoutes = require("./routes/Payments");


const database = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinary")

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

PORT = process.env.PORT || 4000;
//db connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());



const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credential:true
  })
)

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp"
  })
)

//cloudinary connect
cloudinaryConnect();

//rooute mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);


//def route
app.use("/", (req, res) => {
  return res.json({
    success: true,
    message:"your server is up and running fine"
  })
})


//listen server
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
})

