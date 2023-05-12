const Joi = require('joi');
const schema = Joi.object({
    phoneNumber: Joi.string()
        .min(5)
        .max(10)
        .required(),
    countryCode: Joi.string()
        .required(),
    otp: Joi.string()
        .required(),
});

module.exports = {
    verifyOtpValidation : schema
}