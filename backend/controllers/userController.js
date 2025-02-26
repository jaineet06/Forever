import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const createToken = (id) => {
    // creating token with data consisting of user's id
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}

// User register route
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if user already exists?
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: 'User Already Exists'
            })
        }

        // Validating email ? right : not 
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Enter a valid email'
            })
        }

        // Check for strong password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Enter a strong password'
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = new userModel({
            name, email, password: hashedPass
        })


        //storing user in database
        const user = await newUser.save()

        // creating token 
        const token = createToken(user._id);

        res.json({
            success: true,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const userLogin = async (req, res) => {

    try {
        const{email, password} = req.body

        // check for user existance in database
        const user = await userModel.findOne({email})
        if(!user){
            res.json({
                success: false,
                message: "No account found"
            })
        }

        // matching hashed pass from user pass
        const isMatch = await bcrypt.compare(password, user.password)


        //Creating token if credentials are matched
        if(isMatch){
            const token = createToken(user._id)
            res.json({
                success: true,
                token: token
            })
        }else{
            res.json({
                success: false,
                message: "Invalid credential"
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const adminLogin = async (req, res) => {

    try {
        const{email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY)
            res.json({success: true, token})
        }else{
            res.json({success: false, message: "Invalid Credentials"})
        } 
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
    

}

export { userLogin, userRegister, adminLogin };