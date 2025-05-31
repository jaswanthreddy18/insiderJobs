import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJob = async (req, res) => {
    try {
        const userId = req._id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"job Id is required",
                success:false
            })
        }
        // check if the user is already applied for a job
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){ 
            return res.status(400).json({
                message:"you have already applied for this job", 
                success:false
            })
        }
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"job not found", 
                success:false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message:"Job applied successfully",
            success:true
        })
    } catch (error) { 
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userid = req._id;
        const application = await Application.find({applicant:userid}).sort({createdAt: -1}).populate({
            path: 'job',
            options: {sort:{createdAt: -1}},
            populate:{
                path:'company',
                options: {sort:{createdAt: -1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No applications",
                success:false
            })
        }
        return res.status(200).json({
            application, 
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {sort:{createdAt: -1}},
            populate:{
                path:'applicant',
            }
        });
    if(!job){
        return res.status(404).json({
            message:"job not found", 
            success:false
        })
    }
    return res.status(200).json({
        job, 
        success:true
    })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status is required", 
                success:false
            })
        }
        const applicantion = await Application.findOne({_id:applicationId});
        if(!applicationId){
            return res.status(404).json({
                message:"application not found", 
                success:false
            })
        }
        //update the status
        applicantion.status = status.toLowerCase();
        await applicantion.save();
        return res.status(200).json({
            message: "status updated successfully", 
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}