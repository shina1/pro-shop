import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

 userSchema.methods.matchPassword = async function (enterPassword) {
   return await bcrypt.compare(enterPassword, this.password)
 }

 userSchema.pre('save', async function(next){

  if(!this.isModified('password')){
    next()
  }

  const salt = await bcrypt.genSalt(10)

  this.password = bcrypt.hash(this.password, salt)
 }) 

const User = mongoose.model("User", userSchema);

export default User;



// TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZmZjOTMyZDQzNzc5NGIzOGQ1NGQyYSIsImlhdCI6MTYyOTk4MDI2MywiZXhwIjoxNjMyNTcyMjYzfQ.vL35INC6szO6I1yKfjO4znkIcXgBlHukVEZhJTBe7t4"