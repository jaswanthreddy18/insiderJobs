import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constatnt';
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from "lucide-react";
import { jasmine } from 'globals';


const Login = () => {

    const [input, SetInput] = useState({
        email:"",
        password:"",
        role:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store => store.auth); 
    const changeEventHandler = (e) => { 
        SetInput({...input, [e.target.name] : e.target.value});
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers:{
                    "content-Type":"application/json"
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/");
                dispatch(setUser(res.data.user));
                console.log(res.data.user)
                toast.success(res.data.message); 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message); 
        } finally {
            dispatch(setLoading(false));
        }
        // console.log(user);
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
                    <h1 className='flex justify-center items-center font-bold text-2xl mb-5'>Login</h1>
                    <div className='my-2 flex flex-col gap-2 text-l'>
                        <label>Email:</label>
                        <input type="text" placeholder='Enter your email' className='border border-black p-2 rounded-[5px]' value={input.email} name = "email" onChange={changeEventHandler} />
                    </div>
                    <div className='my-2 flex flex-col gap-2 text-l'>
                        <label>Password:</label>
                        <input type="text" placeholder='Enter your password' className='border border-black p-2 rounded-[5px]' value={input.password} name = "password" onChange={changeEventHandler} />
                    </div>
                    <div className='py-5'>
                        <RadioGroup defaultValue="option-one" className='flex flex-row gap-5'>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name='role' value="student" className='cursor-pointer' checked= {input.role === 'student'} onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name='role' value="recruiter" className='cursor-pointer' checked= {input.role === 'recruiter'} onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <button className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800 flex items-center justify-center ' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</button> : <button type='submit' className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800'>login</button>
                    }
                    <span className='text-sm'>Dont have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login