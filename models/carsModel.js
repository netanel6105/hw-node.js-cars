const mongoose = require("mongoose");
const Joi = require("joi");



const carSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    img_url:String,
    info:String,
    user_id:String,

    date_created:{
      type:Date, default:Date.now()
    }
  })
  exports.CarModel = mongoose.model("cars",carSchema);
  




  
  exports.validteCar = (reqBody) =>{
    let joiSchema = Joi.object({
      name:Joi.string().min(2).max(150).required(),
      info:Joi.string().min(2).max(9999),
      category:Joi.string().min(2).max(9999).required(),
      price:Joi.number().min(1).max(500000).required(),
      // allow -> מאפשר לשלוח סטרינג ריק
      img_url:Joi.string().min(2).max(300).allow(null,"")
    })
    return joiSchema.validate(reqBody);
  }