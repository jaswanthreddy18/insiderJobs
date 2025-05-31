import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchComapnyByText } from '@/redux/companySlice'

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setsearchComapnyByText(input));
    },[input])
  return (
    <div>
        <Navbar />
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input className="w-fit rounded-[5px]" placeholder="Filter by Name" onChange={(e) => setInput(e.target.value)} />
                <Button className="bg-black text-white rounded-[5px] hover:bg-black" onClick={() => navigate("/admin/companies/create") } >New Company</Button>
            </div>
            <CompaniesTable  />
        </div>
    </div>
  )
}

export default Companies