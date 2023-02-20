import User from "../models/User.js"
// import bcryptjs for encoding passwords => npm install bcryptjs
import bcrypt from "bcryptjs"
// import error handler 
import { createError } from "../utils/error.js"
// import jwt ==> npm install jsonwebtoken
// import cookies ==> npm install cookie-parser =>use into index as a middleware                
import jwt from "jsonwebtoken"


//! REGISTER

export const register = async (req, res, next) => {
    try {

        // hashing the password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        // creating the user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send(`welcome ${newUser.username} you registration has done successfully`)
    } catch(err) {
        next(err)
    }
}

//! LOGIN

export const login = async (req, res, next) => {
    try {

        // checking if the User is found
        const user = await User.findOne({username:req.body.username})

        if (!user) return next(createError(404, `User ${req.body.username} not found`))

        // checking if the password is correct
        const isPassworsMatch = await bcrypt.compare(req.body.password, user.password)
        
        if (!isPassworsMatch) return next(createError(400, "Wrong password or username!"))

        // setting the user's token
        const token = jwt.sign( {id: user._id, isAdmin: user.isAdmin}, process.env.JWT )
            
        // filtering the user's password and token role before sending 
        const {password, isAdmin, ...otherDetails} = user._doc

        // send cookie & user Details
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({details: {...otherDetails}, isAdmin})
        
    } catch(err) {
        next(err) 
    }
}