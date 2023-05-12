const Joi = require('joi');
const schema = Joi.object({
    userType : Joi.string().valid('GROOM','BRIDE'),
    phoneNumber: Joi.string()
        .min(5)
        .max(10)
        .required(),
    countryCode: Joi.string()
        .required(),
    name: Joi.string()
    .required(),
    email: Joi.string()
    .required(),
    dob: Joi.date().iso().required(),
    motherTongue: Joi.string()
    .required(),
    religion: Joi.string()
    .required(),    
    location: Joi.string()
    .required(),
    maritalStatus: Joi.string().valid('SINGLE','MARRIED'),
    height: Joi.string()
    .required(),
    cast: Joi.string()
    .required(),
    birthStart: Joi.string()
    .required(),
    education: Joi.string()
    .required(),
    job: Joi.string()
    .required(),
    bio: Joi.string()
    .required(),
    foodType: Joi.string().valid('NONVEGITERIAN','VEGITERIAN','BOTH'),
    drinkType: Joi.string()
    .required(),
    smoker: Joi.string().valid('NONSMOKER','SMOKER'),
    ideologies: Joi.string()
    .required(),
    setting: Joi.object().keys({
        showFullname: Joi.string().required(),
        showDob: Joi.string().required(),
        showLocation: Joi.string().required(),
    }).required(),
    referralCode: Joi.string().allow(""),
    hobbies:Joi.array().required(),
    profileImage:Joi.array().required(),
});

module.exports = {
    signupValidation : schema
}