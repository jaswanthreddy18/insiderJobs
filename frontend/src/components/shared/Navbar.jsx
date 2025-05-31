import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LogOut, User2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '@/redux/authSlice';
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constatnt";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(store => store.auth); 
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>insider<span className='text-[#6A38C2]'>Jobs</span></h1>
                </div>
                <div className='flex items-center'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === "recruiter"?(
                                <>
                                    <li><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ):(
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }
                       
                    </ul>
                    {
                        user ? (
                            <div className="pl-10"><Popover>
                            <PopoverTrigger><Avatar>
                                <AvatarImage src={user.profile.profilePhoto} /> 
                            </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 bg-white'>
                                <div className="flex gap-4 space-y-2">
                                    <Avatar>
                                        <AvatarImage src={user.profile.profilePhoto} />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className="pt-3">
                                    {
                                       user && user.role === "student" && (
                                        <div className="flex gap-2 items-center">
                                            <User2 />
                                            <Button variant="link"><Link to={"/profile"}>View Profile</Link></Button>
                                        </div>
                                        )
                                    } 
                                    <div className="flex gap-2 items-center">
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover></div>
                        ) : (
                            <div className="flex gap-3 pl-4">
                                <Link to="/login"><Button variant='outline' className='rounded-[5px]'>Login</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2]  hover:bg-[#644496] rounded-[5px] text-white'>Signup</Button></Link>
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar