const express = require("express");

const router = express.Router();


router.get("/", async(req,res)=>{
    res.json({msg:"index is working"})
})

module.exports = router;