import { JOB_API_END_POINT } from '@/components/utils/constatnt'
import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const allJobs = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials: true});
                if(res.data.success) {
                    dispatch(setAllAdminJobs (res.data.jobs));
                    // console.log(res.data.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs 