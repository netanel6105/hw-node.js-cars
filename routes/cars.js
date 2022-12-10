
const express = require("express");
const { CarModel, validteCar } = require("../models/carsModel");
const {auth} = require("../middleWares/auth");
const router = express.Router();





router.get("/", async(req,res)=>{
  let perPage = Number(req.query.perPage) || 10;
  let page = Number(req.query.page) || 1
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;

  try{
    let data = await CarModel.find({})
    .limit(perPage)
    .skip((page-1)*perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})




router.get("/userList", auth,async(req,res) => {
   
    let perPage = Number(req.query.perPage) || 4;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
  
    try{  
      let data = await CarModel
      .find({user_id:req.tokenData._id})
      .limit(perPage)
      .skip((page-1) * perPage )
      .sort({[sort]:reverse})
      res.json(data); 
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })
  





router.get("/price", async(req,res) => {

    try{
      let min = req.query.min || 20000;
      let max = req.query.max || 5000000;
      let data = await CarModel.find({price:{$lte:max, $gte:min}})
      .limit(20)
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })








router.get("/search",async(req,res)=>{
    try{
        let searchQ = req.query.s;
        let searchExp = new RegExp(searchQ, "i")

        let data = await CarModel.find({name:searchExp})
        .limit(20)
        res.json(data);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
      }

})




router.get("/category",async(req,res)=>{
    try{
        let searchQ = req.query.s;
        let categoryExp = new RegExp(searchQ, "i")

        let data = await CarModel.find({category:categoryExp})
        .limit(20)
        res.json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})





   router.post("/",auth, async(req,res)=>{
    let validBody = validteCar(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }

    try{
        let car = new CarModel(req.body)
        car.user_id = req.tokenData._id;
        await car.save()
        res.status(201).json(car);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
      }
   })





   router.put("/:idEdit",auth, async(req,res)=>{
    let validBody = validteCar(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }

    try{
        let idEdit = req.params.idEdit;
        let data = await CarModel.updateOne({_id:idEdit, user_id:req.tokenData_id},req.body)
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
   })



   
   
   router.delete("/:idDel",auth, async(req,res)=>{
    try{

        let idDel = req.params.idDel;
        let data = await CarModel.deleteOne({id:idDel, user_id:req.tokenData._id})
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
   })
   

module.exports = router;