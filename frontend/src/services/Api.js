import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

export const AgentSignup = async (data) => {
    console.log(data);
    try{
        const response = await commonrequest("POST", `${BACKEND_URL}/agent/addAgent`, data, { 
            'Content-Type': 'multipart/form-data'
        });
        return response;
    }catch (error) {
        throw new Error("Error fetching graph data");
    }
}