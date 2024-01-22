import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

const postRequest = async (endpoint, data, headers={}, params={}) => {
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/${endpoint}`, data, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in POST request to ${endpoint}`);
    }
};

const getRequest = async (endpoint, params={}) => {
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/${endpoint}`, {}, {}, params);
        return response;
    } catch (error) {
        throw new Error(`Error in GET request to ${endpoint}`);
    }
};

// Agent functions
export const AgentSignup = async (data) => {
    return postRequest("agent/addAgent", data);
};

export const getAgents = async () => {
    return getRequest("agent/getAgents");
};

export const getFullAgent = async (id) => {
    return getRequest(`agent/getFullAgent`, {id});
};

// Company functions
export const addCompany = async (data) => {
    return postRequest("company/addCompany", data);
};

export const addAgency = async (data) => {
    return postRequest("company/addAgency", data);
};

export const removeCompany = async (id) => {
    return getRequest(`company/removeCompany`, {id});
};

export const addProduct = async (data) => {
    return postRequest("company/addProduct", data);
};

export const CheckIfGroupCodeExists = async (id) => {
    return getRequest(`customer/isGroupExist`, {id});
};

// Customer functions
export const addCustomer = async (data) => {
    return postRequest("customer/addMember", data);
};
