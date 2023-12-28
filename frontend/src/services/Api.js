import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

export const AgentSignup = async (data) => {
    console.log(data);
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/agent/addAgent`, data, {
            'Content-Type': 'multipart/form-data'
        });
        return response;
    } catch (error) {
        throw new Error("Error fetching graph data");
    }
}

export const getAgents = async () => {
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/agent/getAgents`);
        return response;
    } catch (error) {
        throw new Error("Error fetching graph data");
    }
}

export const getFullAgent = async (id) => {
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/agent/getFullAgent?id=${id}`);
        return response;
    } catch (error) {
        throw new Error("Error fetching Agent data");
    }
}

export const addCompany = async (data) => {
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/company/addCompany`, data, {
            'Content-Type': 'application/json'
        });
        return response;
    } catch (error) {
        throw new Error("Error fetching graph data");
    }
}