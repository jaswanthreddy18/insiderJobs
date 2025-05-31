import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs:[],
        searchTextByJob:"",
        allAppliedJobs:[],
        searchText:""
    }, 
    reducers: {
        //actions
        setAllJobs:(state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchTextByJob:(state, action) => {
            state.searchTextByJob = action.payload;
        },
        setAllAppliedJobs:(state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchText:(state, action) => {
            state.searchText = action.payload;
        }
    }
});

export const {setAllJobs, setSingleJob, setAllAdminJobs, setSearchTextByJob, setAllAppliedJobs, setSearchText} = jobSlice.actions;
export default jobSlice.reducer;
