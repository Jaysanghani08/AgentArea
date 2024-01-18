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

export const addAgency = async (data) => {
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/company/addAgency`, data, {
            'Content-Type': 'application/json'
        });
        return response;
    } catch (error) {
        throw new Error("Error fetching graph data");
    }
}


//baaki
export const removeCompany = async (id) => {
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/company/removeCompany?id=658f9aab2a7c2ed3429800b6`);
        return response;
    } catch (error) {
        throw new Error("Error fetching graph data");
    }
}

// baaki
export const addProduct = async (data) => {
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/company/addProduct`, data, {
            'Content-Type': 'application/json'
        });
        return response;
    } catch (error) {
        throw new Error("Error in adding product");
    }
}

export const CheckIfGroupCodeExists = async (data) => {
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/customer/isGroupExist`, {}, {
            'Content-Type': 'application/json'
        }, {
            id: data
        });
        return response;
    } catch (error) {
        throw new Error("Error in adding product");
    }
}