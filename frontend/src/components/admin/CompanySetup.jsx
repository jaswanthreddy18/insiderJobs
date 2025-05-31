import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT } from '../utils/constatnt'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {singleCompany} = useSelector(store => store.company);
    // console.log(singleCompany);
    const [input, setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    });
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    } 
    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers:{
                    "content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message); 
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
      setInput({
        name:singleCompany.name || "",
        description:singleCompany.description || "",
        website:singleCompany.website || "",
        location:singleCompany.location || "",
        file:singleCompany.file || null,
      })
    },[singleCompany])
    
  return (
    <div>
        <Navbar />
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={submitHandler}>
                <div className='flex items-center gap-5 p-8'>
                    <Button variant="outline" className="flex items-center gap-2 font-semiboldrounded-[5px] border-gray-300 hover:bg-gray-200" onClick={() => navigate("/admin/companies")}>
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>
                <div className='grid grid-cols-2 items-center gap-4'>
                    <div>
                    <Label>Comapny Name:</Label>
                    <Input type="text" name="name" value={input.name} onChange={changeEventHandler} className="rounded-[5px]" />
                    </div>
                    <div>
                    <Label>Description:</Label>
                    <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="rounded-[5px]" />
                    </div>
                    <div>
                    <Label>Website:</Label>
                    <Input type="text" name="website" value={input.website} onChange={changeEventHandler} className="rounded-[5px]" />
                    </div>
                    <div>
                    <Label>Location:</Label>
                    <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="rounded-[5px]" />
                    </div>
                    <div>
                    <Label>Logo</Label>
                    <Input type="file" accept="image/*" onChange={changeFileHandler} className="rounded-[5px]" />
                    </div>
                </div>
                {
                        loading ? <button className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800 flex items-center justify-center ' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</button> : <button type='submit' className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800'>Update</button>
                    }
            </form>
        </div>
    </div>
  )
}

export default CompanySetup