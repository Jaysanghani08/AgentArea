import Cookies from "js-cookie";
import { commonrequest } from "./common_request";
import { BACKEND_URL } from "./helper";

const user = JSON.parse(Cookies.get('user') || null);

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
        alert('No token found');
        // throw new Error('No token found');
    }
    const headers = {};
    headers['Authorization '] = token;
    headers['Content-Type'] = 'application/json';

    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/${endpoint}`, {}, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in GET request to ${endpoint}`);
    }
};

// Agent functions
export const AgentSignup = async (data) => {
    return postRequestWithToken("agent/addAgent", data, {
        "Content-Type": "multipart/form-data",
    }, {});
};

export const updatePassword = async (data) => {
    return postRequestWithToken("agent/updatePassword", data);
}

export const sendOTPToCreateAgent = async (data) => {
    return postRequestWithToken("agent/mailer/sendOTP", data);
}

export const verifyOTPToCreateAgent = async (data) => {
    return postRequestWithToken("agent/verifyOTP", data);
}

export const getAgents = async () => {
    return getRequest("agent/getAgents");
};

export const getFullAgent = async (id) => {
    return getRequest(`agent/getFullAgent`, { id });
};

// Company functions
export const getCompanies = async () => {
    return await getRequest("company/getCompanies");
};

export const addCompany = async (data) => {
    return postRequestWithToken("company/addCompany", data);
};

export const addAgency = async (data) => {
    return postRequestWithToken("company/addAgency", data);
};

export const getAgencies = async (id) => {
    return getRequest(`company/getAgencies`, { id });
}

export const removeCompany = async (id) => {
    return getRequest(`company/removeCompany`, { id });
};

export const addProduct = async (data) => {
    return postRequestWithToken("company/addProduct", data);
};

export const getProducts = async (id) => {
    return getRequest(`company/getProducts`, { id });
}

export const CheckIfGroupCodeExists = async (id) => {
    return getRequest(`customer/isGroupExist`, { id });
};

// Policy functions
export const addPolicy = async (data) => {
    return postRequestWithToken("policy/addPolicy", data, {
        "Content-Type": "multipart/form-data",
    }, {});
};

export const getPolicies = async () => {
    return getRequest(`admin/policy/getPolicies`);
}

export const getAgentPolicies = async () => {
    return getRequest(`agent/policy/getPolicies`);
}

export const getPolicy = async (policy_number) => {
    return getRequest(`admin/policy/getFullPolicy`, { policy_number });
}

export const getAgentPolicy = async (policy_number) => {
    return getRequest(`agent/policy/getFullPolicy`, { policy_number });
}

// Customer functions
export const addCustomer = async (data) => {
    return postRequest("customer/addMember", data);
};
