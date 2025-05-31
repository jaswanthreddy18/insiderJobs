import { createSlice } from "@reduxjs/toolkit";

const ApplicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [],
    },
    reducers: {
        //actions
        setAllApplicants:(state, action) => {
            state.applicants = action.payload;
        },
        
    }
});

export const {setAllApplicants} = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
