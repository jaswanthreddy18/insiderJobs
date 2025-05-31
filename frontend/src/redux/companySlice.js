import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany:null,
        companies:[],
        searchComapnyByText:""
    },
    reducers: {
        //actions
        setSinglecompany:(state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state, action) => {
            state.companies = action.payload;
        },
        setsearchComapnyByText:(state, action) => {
            state.searchComapnyByText = action.payload;
        },
    }
});

export const {setSinglecompany, setCompanies, setsearchComapnyByText} = companySlice.actions;
export default companySlice.reducer;
