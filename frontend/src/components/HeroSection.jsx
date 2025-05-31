import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10 items-center '>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium '>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]' >Dream Jobs</span></h1>
                <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis optio id unde itaque. Quidem, amet.</p>
                <div className='flex w-[40%] shadow-lg border rounded-full pl-4 mx-auto border-gray-300'>
                    <input type="text" placeholder='Find Your Dream Jobs' className='outline-none border-none w-full' onChange={(e) => setQuery(e.target.value)} />
                    <Button onClick={searchJobHandler} className='bg-[#6A38C2]  text-white hover:bg-[#7849cb] rounded-r-full ' >
                    <Search/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection