import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTokens.js'
import User from '../modules/userModule.js'


// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUsers = asyncHandler( async(req, res)=>{
   const {email, password} = req.body;
   const user = await User.findOne({email})
   if(user && (await user.matchPassword(password))){
       res.status(200).json({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id)
       })
   }else{
       res.status(401)
       throw new Error('Invalid email or password')
   }
})

// @desc     Create user 
// @route    POST /api/users
// @access   Public

const createUser = asyncHandler(async(req, res)=>{
  const {name, email, password } = req.body;

  const userExist = await User.findOne({email})
  if(userExist){
      res.status(400)
      throw new Error('User already exist')
  }
  const user = await User.create({
      name,
      email,
      password
  })
  if(user){
      res.status(201).json({
          status: 'success',
          message: 'user created',
          data:{
              _id: user._id,
              name: user.name,
              email: user.email,
              password: user.password,
              isAdmin: user.isAdmin,
              token: generateToken(user._id)
          }
      })
  } else{
      res.status(400)
      throw new Error('User not created')
  }

})

// @desc     Auth user profile
// @route    GET /api/users/profile
// @access   Private

const getUserProfile = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id);

  if(user){
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
  }else{
      res.status(404)
      throw new Error('User not found')
  }
})
 


// @desc     Auth user profile
// @route    PUT /api/users/profile
// @access   Private

const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
  
    if(user){
        
          user.name= req.body.name || user.name
          user.email =  req.body.email || user.email
          if(req.body.password){
              user.password = req.body.password
          }
          const updatedUser = await user.save()
          res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
  })
   
  export{
      authUsers,
      getUserProfile,
      createUser,
      updateUserProfile
  }