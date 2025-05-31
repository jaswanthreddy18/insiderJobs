import { APPLICATION_API_END_POINT } from '@/components/utils/constatnt';
import { setAllAppliedJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                    // console.log(res.data.application);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    })
}

export default useGetAppliedJobs