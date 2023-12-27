import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

export const AgentSignup = async (data) => {
    try{
        const response = await commonrequest("POST", `${BACKEND_URL}/`, data, {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
        console.log(response?.data)
        return response?.data;
    }catch (error) {
        throw new Error("Error fetching graph data");
    }
}