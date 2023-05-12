const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendOtpValidation } = require("./sendOtpValidation");
const { verifyOtpValidation } = require("./verifyOtpValidation");
const { signupValidation } = require("./signupValidation");

const secretKey = process.env.JWT_SECRET || "6767676888";

const signToken = (user) => {
  const payload = {
    sub: user._id,
  };
  return jwt.sign(payload, secretKey);
};

const verifyToken = (req, res, next) =>
  jwt.verify(req.headers.authorization, secretKey, async (err, decoded) => {
    if (err || !decoded || !decoded.sub) {
      return res.status(401).send({
        success: false,

        message: "UNAUTHORIZED",
      });
    }

    const user = await User.findOne({
      _id: decoded.sub,
      isDeleted: false,
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "UNAUTHORIZED",
      });
    }

    req.user = user;

    next();
  });

  const sendOtp = async  (req, res, next) =>{
    try {
        const data = req.body;
        const value = await sendOtpValidation.validateAsync(data);
        console.log(value);
        if(value){
          next();
        }
    }
    catch (err) { 
      return res.status(200).send({
        success: false,
        message: err.details[0].message,
      });
  }  
};

const verifyOtp = async  (req, res, next) =>{
  try {
      const data = req.body;
      const value = await verifyOtpValidation.validateAsync(data);
      console.log(value);
      if(value){
        next();
      }
  }
  catch (err) { 
    return res.status(200).send({
      success: false,
      message: err.details[0].message,
    });
}  
};

const signUp = async  (req, res, next) =>{
  try {
      const data = req.body;
      const value = await signupValidation.validateAsync(data);
      console.log(value);
      if(value){
        next();
      }
  }
  catch (err) { 
    return res.status(200).send({
      success: false,
      message: err.details[0].message,
    });
}  
};

module.exports = {
  verifyToken,
  signToken,
  sendOtp,
  verifyOtp,
  signUp
};
