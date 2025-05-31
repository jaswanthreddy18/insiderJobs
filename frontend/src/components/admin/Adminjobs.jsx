import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobstable from './AdminJobstable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchTextByJob } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setSearchTextByJob(input));
    },[input])
  return (
    <div>
        <Navbar />
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input className="w-fit rounded-[5px]" placeholder="Filter by Name or Role" onChange={(e) => setInput(e.target.value)} />
                <Button className="bg-black text-white rounded-[5px] hover:bg-black" onClick={() => navigate("/admin/jobs/create") } >New Job</Button>
            </div>
            <AdminJobstable/>
        </div>
    </div>
  )
}

export default AdminJobs