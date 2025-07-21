import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.models.js";
import uploadoncloud from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccesstoken()
        const refreshToken = user.generateRefreshtoken()

        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registeruser = asyncHandler(async (req, res) => {
    // 1. Get user details from request
    const { username, email, password } = req.body;

    // 2. Validate that no fields are empty
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Username, email, and password are required");
    }

    // 3. Check if user already exists in the database
    const existeduser = await User.findOne({ $or: [{ username }, { email }] });
    if (existeduser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    // 4. Get file paths from multer
    const avatarlocalPath = req.files?.avatar?.[0]?.path;
    const coverimagelocalpath = req.files?.coverimage?.[0]?.path; // Correct lowercase name

    if (!avatarlocalPath) {
        throw new ApiError(400, "Avatar file is mandatory");
    }

    // 5. Upload files to Cloudinary (this is now safe)
    const avatar = await uploadoncloud(avatarlocalPath);
    const coverimage = await uploadoncloud(coverimagelocalpath); // This will return null if no file was provided

    if (!avatar) {
        // This checks if the uploadoncloud function itself failed
        throw new ApiError(500, "Failed to upload avatar, please try again");
    }

    // 6. Create user object and save to database
    const user = await User.create({
        username,
        email,
        password, // The model should handle hashing this automatically (using a pre-save hook)
        avatar: avatar.url,
        coverimage: coverimage?.url || "" // Safely access the URL, provide empty string if no cover image
    });

    // 7. Fetch the created user from DB but remove sensitive fields
    const createduser = await User.findById(user._id).select("-password -refreshtoken");

    if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 8. Send a success response back to the client
    return res.status(201).json(
        new ApiResponse(201, createduser, "User registered successfully")
    );
});




const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
}

const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
    httpOnly: true,
    secure: true
}

return res
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(
    new ApiResponse(
        200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    )
)

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export { registeruser, loginUser,logoutUser };