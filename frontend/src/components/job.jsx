import { Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const job = ({job}) => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
    }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
        <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full border-none" size="icon"><Bookmark/></Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
        <Button className="p-6 border-none" variant ="outline" size="icon">
            <Avatar>
                <AvatarImage src={job?.company?.logo} />
            </Avatar>
        </Button>
        <div>
            <h1>{job?.company?.name}</h1>
            <p className='text-gray-500 text-sm'>India</p>
        </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-500'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-[#6A38C2] font-bold'} variant="ghost">{job?.position}</Badge>
        <Badge className={'text-[#6A38C2] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#6A38C2] font-bold'} variant="ghost">{job?.salary}</Badge>
        </div>
        <div className='flex gap-3 mt-4'>
            <Button onClick={() => navigate(`/description/${job?._id}`)} className="rounded-[5px]" variant="outline">Details</Button>
            <Button className="bg-[#6A38C2] rounded-[5px] text-white hover:bg-[#644496]">Save For Later</Button>
        </div>
    </div>
  )
}

export default job