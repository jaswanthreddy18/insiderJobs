import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constatnt';
import { toast } from "sonner"
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from "lucide-react";

const Signup = () => {

    const [input, SetInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store => store.auth); 
    const changeEventHandler = (e) => {
        SetInput({...input, [e.target.name] : e.target.value});
    }
    const changeFileHandler = (e) => {
        SetInput({...input, file : e.target.files?.[0]});
    }
     
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers:{
                    "content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message); 
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if(user) {
            navigate("/");
        }
    })
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border p-4 rounded-[5px] border-gray-200 my-10'>
                    <h1 className='flex justify-center items-center font-bold text-2xl mb-5'>Sign Up</h1>
                    <div className='my-2 flex flex-col gap-2 text-l'>
                        <label>Full Name:</label>
                        <input type="text" placeholder='Enter your name' className='border border-black p-2 rounded-[5px]' value={input.fullname} name = "fullname" onChange={changeEventHandler}/>
                    </div>
                    <div className='my-2 flex flex-col gap-2 text-l'>
                        <label>Email:</label>
                        <input type="email" placeholder='Enter your email' className='border border-black p-2 rounded-[5px]' value={input.email} name = "email" onChange={changeEventHandler} />
                    </div>
                    <div className='my-2 flex flex-col gap-2 text-l'>
                        <label>Phone Number:</label>
                        <input type="text" placeholder='Enter your number' className='border border-black p-2 rounded-[5px]' value={input.phoneNumber} name = "phoneNumber" onChange={changeEventHandler} />
                    </div>
                    <div className='my-2 flex flex-col gap-2 text-l'>
                        <label>Password:</label>
                        <input type="password" placeholder='Enter your password' className='border border-black p-2 rounded-[5px]' value={input.password} name = "password" onChange={changeEventHandler}/>
                    </div>
                    <div className='py-5'>
                        <RadioGroup defaultValue="option-one" className='flex flex-row gap-5'>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name='role' value="student" checked= {input.role === 'student'} onChange={changeEventHandler} className='cursor-pointer' />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name='role' value="recruiter" checked= {input.role === 'recruiter'} onChange={changeEventHandler}  className='cursor-pointer' />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='p-3'> 
                        <label htmlFor="profile"></label>
                        <input type="file" accept='image/*' name="file" className='cursor-pointer' onChange={changeFileHandler}/>
                    </div>
                    {
                        loading ? <button className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800 flex items-center justify-center ' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</button> : <button type='submit' className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800'>Signup</button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup