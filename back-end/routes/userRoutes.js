import express from 'express'
import { authUsers, getUserProfile, createUser, updateUserProfile } from '../controlers/userControler.js';
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(createUser)
router.post('/login',authUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)




export default router