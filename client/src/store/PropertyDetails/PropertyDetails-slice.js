import { createSlice } from "@reduxjs/toolkit";

const PropertyDetailsSlice = createSlice({
    name: "PropertyDetails",
    initialState :{
        propertydetails:null,
        loading:false,
        error:null,
    },
    reducers:{
        getListRequest(state){
            state.loading = true;
        },
        getPropertyDetails(state,action){
            state.propertydetails= action.payload;
            state.loading=false;
        },
        getErrors(state,action){
            state.error=action.payload;
            state.loading=false;
        },
    },
})

export const PropertyDetailsAction = PropertyDetailsSlice.actions;
export default PropertyDetailsSlice;