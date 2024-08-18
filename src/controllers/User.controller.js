import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/apiResponce.js";


const registerUser = asyncHandler( async (req, res) => {
    
    const {username, email, fullName, password} = req.body;
    
    if (
        [username, email, fullName, password].some((field) => field?.trim() === "")
    ) { 
        throw new ApiError(400, "All fiels are requied");
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exist");
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const converImageLocalPath = req.files?.avtar[0]?.path;
    if (!avtarLocalPath) {
        throw new ApiError(400, "Avtar filed is required");
    }

    const avtar = await uploadOnCloudinary(avtarLocalPath);
    const converImage = await uploadOnCloudinary(converImageLocalPath);

    if (!avtar) {
        throw new ApiError(400, "Avtar filed is required");
    }

    const user = User.create({
        fullName,
        avtar : avtar.url,
        converImage : converImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring user");
    }

    return res.status(201).json(
        new ApiResponce(200, createdUser, "User registered successfully!")
    )    
} )

export { registerUser }