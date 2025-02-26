import express from 'express'
import {placeOrder, placeOrderStripe, userOrders, updateStatus, allOrders, verifyStripe} from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'
const orderRouter = express.Router()


//Admin
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

//User
orderRouter.post('/userorders', authUser, userOrders)


//Verfiy Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter