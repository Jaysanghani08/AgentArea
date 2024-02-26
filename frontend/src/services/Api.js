import Cookies from "js-cookie";
import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

const user = JSON.parse(Cookies.get('user') || null);;

export const postRequest = async (endpoint, data, headers = {}, params = {}) => {

    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/${endpoint}`, data, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in POST request to ${endpoint}`);
    }
};

export const postRequestWithToken = async (endpoint, data, headers = {}, params = {}) => {
    const token = user?.token;
    if (!token) {
        throw new Error('No token found');
    }
    headers['Authorization '] = token;
    headers['Content-Type'] = 'application/json';
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/${endpoint}`, data, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in POST request to ${endpoint}`);
    }
}

export const getRequest = async (endpoint, params = {}) => {
    const token = user?.token;
    if (!token) {
        throw new Error('No token found');
    }
    const headers = {};
    headers['Authorization '] = token;
    headers['Content-Type'] = 'application/json';
    
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/${endpoint}`, {}, {}, params);
        return response;
    } catch (error) {
        throw new Error(`Error in GET request to ${endpoint}`);
    }
};

// Agent functions
export const AgentSignup = async (data) => {
    return postRequest("agent/addAgent", data, {
        "Content-Type": "multipart/form-data",
    }, {});
};

export const getAgents = async () => {
    return getRequest("agent/getAgents");
};

export const getFullAgent = async (id) => {
    return getRequest(`agent/getFullAgent`, { id });
};

// Company functions
export const getCompanies = async () => {
    return getRequest("company/getCompanies");
};

export const addCompany = async (data) => {
    return postRequestWithToken("company/addCompany", data);
};

export const addAgency = async (data) => {
    return postRequestWithToken("company/addAgency", data);
};

export const removeCompany = async (id) => {
    return getRequest(`company/removeCompany`, { id });
};

export const addProduct = async (data) => {
    return postRequestWithToken("company/addProduct", data);
};

export const CheckIfGroupCodeExists = async (id) => {
    return getRequest(`customer/isGroupExist`, { id });
};

// Policy functions
export const addPolicy = async (data) => {
    return postRequest("policy/addPolicy", data, {
        "Content-Type": "multipart/form-data",
    }, {});
};

export const getPolicy = async () => {
    return getRequest(`policy/getPolicies`);
}

// Customer functions
export const addCustomer = async (data) => {
    return postRequest("customer/addMember", data);
};
