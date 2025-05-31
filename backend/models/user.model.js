import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student', 'recruiter'],
        required: true
    },
    profile:{
        bio:{type:String},
        skills:[{type: String}],
        resume: {type:String}, // URL
        resumeOriginalName: {type:String}, 
        company: {type: mongoose.Schema.Types.ObjectId, ref:'Company'}, // relation bw company table and user table storing id of comapny schema
        profilePhoto:{
            type:String,
            default:""
        }
    },
}, {timestamps:true});
export const User = mongoose.model('User', userSchema);