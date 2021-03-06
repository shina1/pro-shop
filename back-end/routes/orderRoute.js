import express from "express";
import {addOrderItems, getOrderByID} from '../controlers/orderControler.js'
import {protect} from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderByID)


export default router 