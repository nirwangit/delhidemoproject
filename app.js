const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { verifyToken, signToken,sendOtp,verifyOtp,signUp } = require("./middleware");

async function createUri() {
  const mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: "testingdb" });
}

createUri();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const { User, Post ,Otp} = require("./models");

const port = 8000;

const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/signup",signUp, async (req, res) => {
  try {
    const { name, phoneNumber, email,userType,dob,motherTongue,religion,location,maritalStatus,height,cast,
             birthStart,education,job,bio,foodType,drinkType,smoker,ideologies,hobbies,
             profileImage,setting,referralCode,countryCode } = req.body;

    let otpModel = await Otp.findOne({phoneNumber,countryCode,isVerified:true});
    if(!otpModel){
      return res.status(200).send({
        success: false,
        message: "Number not verified",
      });
    }

    let referralUserId = "";
    let userChek = await User.findOne({ phoneNumber, countryCode });

    if(userChek){
      return res.status(200).send({
        success: false,
        message: "Mobile already exist",
      });
    }

    if(referralCode){
      let referralUser = await User.findOne({referralCode});
      referralUserId = (referralUser)?referralUser._id:"";
    }
    let user = new User({
      name, phoneNumber, email,userType,dob,motherTongue,countryCode,religion,location,maritalStatus,height,cast,
             birthStart,education,job,bio,foodType,drinkType,smoker,ideologies,hobbies,
             profileImage,setting,referralUserId
    });

    const data = await user.save();
    const token = signToken(data);
    return res.status(200).send({
      success: true,
      data,
      token,
      message: "User added successfully",
    });
  } catch (err) {
    console.log(err);
  }
});



app.post("/sendOtp",sendOtp, async (req, res) => {
  try {
    const { phoneNumber, countryCode } = req.body;

    let otpModel = await Otp.findOne({phoneNumber,countryCode});
    if(!otpModel)
      otpModel = new Otp({
        phoneNumber,
        countryCode
    });
    otpModel.otp=1234;
    await otpModel.save();
    return res.status(200).send({
      success: true,
      message: "Otp Send successfully",
    });
  } catch (err) {
    console.log(err);
  }
});


app.post("/verifyOtp", verifyOtp,async (req, res) => {
  try {
    const { phoneNumber, countryCode } = req.body;

    let otpModel = await Otp.findOne({phoneNumber,countryCode});
    if(!otpModel){
      return res.status(200).send({
        success: false,
        message: "Invalid Otp",
      });
    }

    otpModel.isVerified = true;
    await otpModel.save();

    let user = await User.findOne({ phoneNumber, countryCode });
    if(!user){
      return res.status(200).send({
        success: true,
        isUserExist : false,
        message: "Otp verification successfully",
      });
    }

    const token = signToken(user);

    return res.status(200).send({
      success: true,
      IsUserExist : true,
      token,
      user, 
      message: "Otp verification successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/", verifyToken,async (req, res) => {
  try {
    const { phoneNumber, countryCode } = req.body;

    return res.status(200).send({
      data:{},
      success: true,
      message: "home data,
    });
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
