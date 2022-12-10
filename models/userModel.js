const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secret")

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  
  date_created:{
    type:Date, default:Date.now()
  },
  role:{
    type:String, default:"user"
  }
})
exports.UserModel = mongoose.model("users",userSchema);





exports.validateUser = (reqBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(150).required()
  })
  return joiSchema.validate(reqBody);
}




exports.validateLogin = (reqBody) => {
  let joiSchema = Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(150).required()
  })
    return joiSchema.validate(reqBody);
  }
  
  


  exports.createToken = (_userId) =>{
      let token = jwt.sign({_id:_userId},config.tokenSecret,{expiresIn:"60mins"});
      return token;
  }





