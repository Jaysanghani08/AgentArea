import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

export const AgentSignup = async (data) => {
    try{
        const response = await commonrequest("POST", `${BACKEND_URL}/addAgent`, data, { 
            'Content-Type': 'multipart/form-data'
        });
        return response?.data;
    }catch (error) {
        throw new Error("Error fetching graph data");
    }
}