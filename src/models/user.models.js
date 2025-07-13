import mongoose, { Schema } from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password Is Required!'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avator: {
      type: String, //for other storing links or urls
      required: true,
    },
    coverimage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    refreshToken: {
      type: Sting,
    },
  },
  { timeseries: true }
);


//yaha pe hamara password ko incript karane ka logic hai
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next() //agr password incript nhi hua hai to direct next pe jao
    this.password = bcrypt.hash(this.password,10) //agr password change hua hai to use hash me change karo
    next()
})

//custome methods banaya hai
userSchema.methods.isPasswordCurrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

//jwt token generation
userSchema.methods.generateAccesToken = function(){
    jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
    {
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

const User = mongoose.model('User', userSchema);
export { User };