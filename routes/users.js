const express = require("express");
const bcrypt = require("bcrypt");
const { auth } = require("../middleWares/auth")
const { UserModel, validateUser, validateLogin, createToken } = require("../models/userModel");
const router = express.Router();



router.get("/", async (req, res) => {
    let data = await UserModel.find({})
    res.json(data);
})




router.post("/", async (req, res) => {
    let validBody = validateUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }

    try {
        let user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save();

        user.password = "*****"
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})



//localhost:3000/users/login
router.post("/login", async (req, res) => {
    let validBody = validateLogin(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {

        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ msg: "User or password not match , code:1" })
        }
        let passwordValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValid) {
            return res.status(401).json({ msg: "User or password not match , code:2" })
        }
        let token = createToken(user._id);
        res.json({ token: token })

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})





router.get("/myUser", auth, async (req, res) => {
    try {
        let data = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})




module.exports = router;