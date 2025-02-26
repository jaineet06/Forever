import express from 'express'
import { userLogin, userRegister, adminLogin } from "../controllers/userController.js"

const userRouter = express.Router();

//Routes from user to access the service
userRouter.post("/login", userLogin)
userRouter.post("/register", userRegister)
userRouter.post("/admin", adminLogin)

export default userRouter
