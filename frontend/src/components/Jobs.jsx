import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './job'
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion'


const Jobs = () => {
    const {allJobs, searchText} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if(searchText){
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchText.toLowerCase()) ||
                job.description.toLowerCase().includes(searchText.toLowerCase()) ||
                job.location.toLowerCase().includes(searchText.toLowerCase())
            })
            setFilterJobs(filteredJobs);
        }
        else{
            setFilterJobs(allJobs);
        }
    },[allJobs, searchText]);
    // console.log(allJobs);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not Found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{duration:0.3}} >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs