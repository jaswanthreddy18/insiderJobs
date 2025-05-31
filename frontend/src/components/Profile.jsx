import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpadateProfileDialog from './UpadateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store => store.auth )
  const skills = user?.profile?.skills || [];
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-6 text-gray-500'>
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profile.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right border-gray-400 rounded-md hover:bg-slate-200" variant="outline"><Pen /></Button>
        </div>
        <div className='mt-5'>
          <div className='flex items-center gap-3 my-2'>
          <Mail />
          <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
          <Contact />
          <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='flex items-center gap-4 my-5'>
          <h1>Skills:</h1>
          <div className='flex items-center gap-3'>
          {
            skills.length != 0 ? skills.map((item, index) => <Badge variant="ghost" key={index}>{item}</Badge> ) : <span>NA</span>
          }
          </div>
        </div>
          <div className='flex w-full max-w-sm items-center gap-4'>
              <Label className="text-md font-bold ">Resume:</Label>
              {
                isResume? <a target='blank' className='text-blue-500' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
              } 
          </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl mb-10'>
              <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
              <AppliedJobTable />
          </div>
        <UpadateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile