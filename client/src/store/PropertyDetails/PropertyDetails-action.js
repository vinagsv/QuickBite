import { axiosInstance } from "../../components/utils/axios";
import { PropertyDetailsAction } from "./PropertyDetails-slice"

export const getPropertyDetails = (id) => async(dispatch)=>{
    try {
        dispatch(PropertyDetailsAction.getListRequest());
        const response = await axiosInstance(`/api/v1/rent/listing/${id}`);
        console.log(response);
        if(!response){
            throw new Error("could not fetch any Property details");
        }
        const {data} = response.data;
        dispatch(PropertyDetailsAction.getPropertyDetails(data));
    } catch (error) {
        dispatch(PropertyDetailsAction.getErrors(error.response.data.error));
    }
}