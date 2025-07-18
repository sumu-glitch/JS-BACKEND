import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiErrorHandler} from '../utils/ApiErrorHandler.js'
import { User } from '../models/user.models.js' 
import { uploadFileCloudinary } from '../utils/cloudinary.js'
import { ApiResponceHandler } from '../utils/ApiResponceHandler.js';

const registorUsers = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: 'ok',
  // });
  // get user details from frontend
  // validation - not empty
  // check if user is already exist
  // check for images, check for avatar
  // upload them to cloudnary, avatar
  // create user object - create entry in db
  // remove passwords and refreshtoken fields
  // check for user creation
  
  const { username, password, fullName, email } = req.body;

  // console.log(`username: ${username}`);
  // console.log(`password ${password}`);
  // console.log(`fullname ${fullName}`);
  // console.log(`email: ${email}`);
  
  //seperately checked
  // if (username === "") {
    // throw new ApiErrorHandler(400,"username is empty");
  // }

  //standard style error handling
  if ([username, password, fullName, email].some((fields)=>
    fields?.trim() === "")) {
    throw new ApiErrorHandler(400,"All fields are require")
  }

  // check user is already exist or not
  const existedUser = User.findOne({
    $or: [ {username}, {email} ]
  })

  // check user
  if (existedUser) {
    throw new ApiErrorHandler(409,"User is already exists")
  }

  // add images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErrorHandler(400,"Avatar file is required")  
  }
  // upload image on cloudinary server
  const avatar = await uploadFileCloudinary(avatarLocalPath);
  const coverImage = await uploadFileCloudinary(coverimageLocalPath);

  // check if image is uploaded or not

   if (avatar) {
    throw new ApiErrorHandler(409,"Avatar is empty")
  }

  // create object of image
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLoverCase()
  })
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiErrorHandler(500,"Something went wrong while registring the user")
  }
  return res.status(201).json(
    new ApiResponceHandler(200, createdUser, "User registared successfully!")
  )

});


export { registorUsers, };
