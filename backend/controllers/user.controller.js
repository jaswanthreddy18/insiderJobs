import {User} from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import getDataUri from '../utils/dataUri.js';
import cloudinary from '../utils/cloudinary.js';
dotenv.config();
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        let profilePhotoUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl
            }
        });

        return res.status(200).json({
            message: 'Account created successfully',
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "something is missing",
                success:false
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect Email",
                success:false
            });
        }
        const isPasswordmatch =  await bcrypt.compare(password, user.password);
        if(!isPasswordmatch){
            return res.status(400).json({
                message: "Incorrect Email or password",
                success:false
            });
        }
        // check role correct or not
        if(role !== user.role){
            return res.status(400).json({
                message: "account doesn't exist with current role.",
                success:false
            });
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
        
        user = {
            _id: user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
       res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          httpOnly: true,
          secure: true,                // ensures it's only sent over HTTPS
          sameSite: 'none'             // allows cross-origin cookie usage
        });
        
        return res.status(200).json({
          message: `Welcome back ${user.fullname}`,
          user,
          success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}) .json({
            message:'logged out successfully',
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        // console.log(fullname, email, phoneNumber, bio, skills);
        // if(!fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message: "something is missing",
        //         success:false
        //     });
        // }; 

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        
        let skillsArray;
        if(skills) skillsArray = skills.split(",");
        const userId =  req._id; // middleware authentication
        let user = await User.findById(userId);

        if(!user){
            return res.staus(400).json({
                message: "user not found",
                success:false
            });
        }
        //updating data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber= phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        // resume updation
        if(cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:'profile updated successfully',
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
