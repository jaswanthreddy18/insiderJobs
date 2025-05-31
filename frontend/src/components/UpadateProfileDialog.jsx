import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constatnt'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from "lucide-react";

    const UpadateProfileDialog = ({open, setOpen}) => {
        const [loading, setLoading] = useState(false);
        const dispatch = useDispatch();
        const {user} = useSelector(store => store.auth);
        const [input, setInput] = useState({
            fullname : user?.fullname || "",
            email:user?.email || "",
            phoneNumber:user?.phoneNumber || "",
            bio:user?.profile?.bio || "",
            skills:user?.profile?.skills?.map(skill=>skill) || "",
            file:user?.profile?.resume || "",
        });

        const changeEventHandler = (e) => {
            setInput({...input,[e.target.name]:e.target.value});
        }
        const fileChangeHandler = (e) => {
            const file = e.target.files?.[0];
            setInput({...input, file});
        }
        const submitHandler = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", input.skills);
            if(input.file) {
                formData.append("file", input.file);
            }
            try {
                setLoading(true); 
                const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                    headers:{
                        "content-Type":"multipart/form-data"
                    },
                    withCredentials:true,
                })
                if(res.data.success) {
                    dispatch(setUser(res.data.user)); 
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally{
                setLoading(false);
            }
            setOpen(false);
            console.log(input);
        }
    return (
        <div>
            <Dialog open={open} className="bg-white">
                <DialogContent className="sm:max-w-[425px] bg-white rounded-[5px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                            <Label htmlFor="name" >Name:</Label>
                            <Input id="name" name="name" type='text' onChange={changeEventHandler} value={input.fullname} className="col-span-3 rounded-[5px]" />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                            <Label htmlFor="name" >Email:</Label>
                            <Input id="email" name="email" type='email' onChange={changeEventHandler} value={input.email} className="col-span-3 rounded-[5px]" />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                            <Label htmlFor="name" >Number:</Label>
                            <Input id="phoneNumber" name="phoneNumber" onChange={changeEventHandler} value={input.phoneNumber} className="col-span-3 rounded-[5px]" />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                            <Label htmlFor="name" >Bio:</Label>
                            <Input id="bio" name="bio" onChange={changeEventHandler} value={input.bio} className="col-span-3 rounded-[5px]" />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                            <Label htmlFor="name" >Skills:</Label>
                            <Input id="skills" name="skills" onChange={changeEventHandler} value={input.skills} className="col-span-3 rounded-[5px]" />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                            <Label htmlFor="name" >Resume:</Label>
                            <Input id="Resume" name="file"  type="file"  accept="application/pdf" onChange={fileChangeHandler} className="col-span-3 rounded-[5px]" />
                            </div>
                        </div>
                        <DialogFooter>
                        {
                            loading ? <button className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800 flex items-center justify-center ' > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</button> : <button type='submit' className='bg-black text-white px-4 py-2 rounded-[5px] w-full my-2 hover:bg-gray-800'>Update</button>
                        }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpadateProfileDialog