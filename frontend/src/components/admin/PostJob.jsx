import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constatnt'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const selectChnageHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-[5px]'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" value={input.title} onChange={changeEventHandler} name="title" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>Description:</Label>
                            <Input type="text" value={input.description} onChange={changeEventHandler} name="description" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" value={input.requirements} onChange={changeEventHandler} name="requirements" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="text" value={input.salary} onChange={changeEventHandler} name="salary" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" value={input.location} onChange={changeEventHandler} name="location" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" value={input.jobType} onChange={changeEventHandler} name="jobType" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input type="text" value={input.experience} onChange={changeEventHandler} name="experience" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input type="number" value={input.position} onChange={changeEventHandler} name="position" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border-gray-400 rounded-[5px]" />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChnageHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return(
                                                        <SelectItem className="cursor-pointer" value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div> 
                    {
                        loading ? <button className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800 flex items-center justify-center ' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</button> : <button type='submit' className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800'>Post New Job</button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please Register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob