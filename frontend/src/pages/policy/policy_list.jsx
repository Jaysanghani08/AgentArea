import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAgentPolicies, getPolicies, isLogged } from '../../services/Api.js'
import Spinner from '../../components/general/spinner.jsx';
import CustomTable from '../../components/general/table/table.jsx';
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import tw from "twin.macro";
import Cookies from 'js-cookie';

export const Container = tw.div`relative flex items-center justify-center p-8 bg-blue-100 min-h-screen`;
export const TextContent = tw.div`mx-auto w-full max-w-screen-2xl px-12 py-8 bg-white rounded-2xl shadow-2xl shadow-blue-800 bg-white`;
export const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
export const Heading = tw(SectionHeading)`text-primary-500 mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
export const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;

// for customer
// policydata = {
//     "data": [
//         {
//             "_id": "65e3a1e82d5e6006023b837a",
//             "customer_id": "659820d7797054275e022ae0",
//             "policy_number": "5555555555",
//             "group_code": "65980c2141052132456e194a",
//             "policy_type": "health",
//             "policy_sub_type": "individual",
//             "company_id": "659c68ab20de061edfa15294",
//             "product_id": "659c69d52398e0bddef78497",
//             "business_type": "Fresh",
//             "login_date": "2024-03-03T00:00:00.000Z",
//             "start_date": "2024-03-03T00:00:00.000Z",
//             "end_date": "2027-04-02T00:00:00.000Z",
//             "basic_premium": 10000,
//             "gst": 18,
//             "total_premium_amount": 31313211,
//             "payment_type": "cash",
//             "premium_deposite_date": "2024-03-03T00:00:00.000Z",
//             "sum_assured": 123421234,
//             "remark": "",
//             "docs": [],
//             "__v": 0,
//             "group": {
//                 "_id": "65980c2141052132456e194a",
//                 "id": 9157212522,
//                 "members": {
//                     "agent_id": "658bed167dd0bb526193617e",
//                     "name": "parmar",
//                     "mobile": 7622051689,
//                     "email": "shubhampatel12233@gmail.com",
//                     "dob": "2003-04-11T00:00:00.000Z",
//                     "_id": "659820d7797054275e022ae0"
//                 },
//                 "__v": 0
//             },
//             "company": {
//                 "_id": "659c68ab20de061edfa15294",
//                 "name": "HDFC",
//                 "url": "www.hdfc.com",
//                 "products": {
//                     "product_name": "HDFC LIFE",
//                     "product_type": "Individual",
//                     "company_agency": "658e63cdc91ffab61946cd2a",
//                     "policy_type": "health",
//                     "_id": "659c69d52398e0bddef78497"
//                 },
//                 "__v": 0
//             }
//         },
//         {
//             "_id": "663a7b9cd685a94f72c4aeef",
//             "agent_id": "66073c9a09f5df02e6b9092a",
//             "customer_id": "659820d7797054275e022ae0",
//             "policy_number": "ABC123498",
//             "group_code": "65980c2141052132456e194a",
//             "policy_type": "health",
//             "policy_sub_type": "individual",
//             "company_id": "659c68ab20de061edfa15294",
//             "product_id": "659c69d52398e0bddef78497",
//             "business_type": "Fresh",
//             "login_date": "2024-05-08T00:00:00.000Z",
//             "start_date": "2024-05-08T00:00:00.000Z",
//             "end_date": "2024-10-08T00:00:00.000Z",
//             "basic_premium": 5000,
//             "gst": null,
//             "total_premium_amount": 5800,
//             "payment_type": "cash",
//             "premium_deposite_date": "2024-05-08T00:00:00.000Z",
//             "sum_assured": 400000,
//             "remark": "",
//             "docs": {
//                 "policy_copy": "https://insureareadata.blob.core.windows.net/agentdocs/policies/ABC123498policy_copy",
//                 "renewal_notice_copy": "https://insureareadata.blob.core.windows.net/agentdocs/policies/ABC123498renewal_notice_copy"
//             },
//             "__v": 0,
//             "group": {
//                 "_id": "65980c2141052132456e194a",
//                 "id": 9157212522,
//                 "members": {
//                     "agent_id": "658bed167dd0bb526193617e",
//                     "name": "parmar",
//                     "mobile": 7622051689,
//                     "email": "shubhampatel12233@gmail.com",
//                     "dob": "2003-04-11T00:00:00.000Z",
//                     "_id": "659820d7797054275e022ae0"
//                 },
//                 "__v": 0
//             },
//             "agent": {
//                 "_id": "66073c9a09f5df02e6b9092a",
//                 "name": "Shubham Patel",
//                 "mobile": "7622051688",
//                 "email": "shubhampatel12233@gmail.com"
//             },
//             "company": {
//                 "_id": "659c68ab20de061edfa15294",
//                 "name": "HDFC",
//                 "url": "www.hdfc.com",
//                 "products": {
//                     "product_name": "HDFC LIFE",
//                     "product_type": "Individual",
//                     "company_agency": "658e63cdc91ffab61946cd2a",
//                     "policy_type": "health",
//                     "_id": "659c69d52398e0bddef78497"
//                 },
//                 "__v": 0
//             }
//         },
//         {
//             "_id": "663a9049574528a9397c68c1",
//             "agent_id": "66073c9a09f5df02e6b9092a",
//             "customer_id": "659820d7797054275e022ae0",
//             "policy_number": "SDF123498",
//             "group_code": "65980c2141052132456e194a",
//             "policy_type": "health",
//             "policy_sub_type": "individual",
//             "company_id": "659c68ab20de061edfa15294",
//             "product_id": "659c69d52398e0bddef78497",
//             "business_type": "Renewal",
//             "login_date": "2024-05-08T00:00:00.000Z",
//             "start_date": "2024-05-08T00:00:00.000Z",
//             "end_date": "2029-12-09T00:00:00.000Z",
//             "basic_premium": 5000,
//             "gst": null,
//             "total_premium_amount": 8300,
//             "payment_type": "cash",
//             "premium_deposite_date": "2024-05-08T00:00:00.000Z",
//             "sum_assured": 6666666,
//             "remark": "",
//             "docs": {
//                 "policy_copy": "https://insureareadata.blob.core.windows.net/agentdocs/policies/SDF123498policy_copy.pdf",
//                 "renewal_notice_copy": "https://insureareadata.blob.core.windows.net/agentdocs/policies/SDF123498renewal_notice_copy.pdf"
//             },
//             "__v": 0,
//             "group": {
//                 "_id": "65980c2141052132456e194a",
//                 "id": 9157212522,
//                 "members": {
//                     "agent_id": "658bed167dd0bb526193617e",
//                     "name": "parmar",
//                     "mobile": 7622051689,
//                     "email": "shubhampatel12233@gmail.com",
//                     "dob": "2003-04-11T00:00:00.000Z",
//                     "_id": "659820d7797054275e022ae0"
//                 },
//                 "__v": 0
//             },
//             "agent": {
//                 "_id": "66073c9a09f5df02e6b9092a",
//                 "name": "Shubham Patel",
//                 "mobile": "7622051688",
//                 "email": "shubhampatel12233@gmail.com"
//             },
//             "company": {
//                 "_id": "659c68ab20de061edfa15294",
//                 "name": "HDFC",
//                 "url": "www.hdfc.com",
//                 "products": {
//                     "product_name": "HDFC LIFE",
//                     "product_type": "Individual",
//                     "company_agency": "658e63cdc91ffab61946cd2a",
//                     "policy_type": "health",
//                     "_id": "659c69d52398e0bddef78497"
//                 },
//                 "__v": 0
//             }
//         },
//         {
//             "_id": "663c53df467534aa06e55728",
//             "agent_id": "66073c9a09f5df02e6b9092a",
//             "customer_id": "659820d7797054275e022ae0",
//             "policy_number": "12314212112",
//             "group_code": "65980c2141052132456e194a",
//             "policy_type": "health",
//             "policy_sub_type": "individual",
//             "company_id": "659c68ab20de061edfa15294",
//             "product_id": "659c69d52398e0bddef78497",
//             "business_type": "Fresh",
//             "login_date": "2024-05-09T00:00:00.000Z",
//             "start_date": "2024-05-09T00:00:00.000Z",
//             "end_date": "2024-05-22T00:00:00.000Z",
//             "basic_premium": 10000,
//             "gst": null,
//             "total_premium_amount": 11800,
//             "payment_type": "cash",
//             "premium_deposite_date": "2024-05-09T00:00:00.000Z",
//             "sum_assured": 1000000,
//             "remark": "jkokofdsdfds",
//             "docs": {
//                 "policy_copy": "https://insureareadata.blob.core.windows.net/agentdocs/policies/12314212112policy_copy.pdf",
//                 "renewal_notice_copy": ""
//             },
//             "__v": 0,
//             "group": {
//                 "_id": "65980c2141052132456e194a",
//                 "id": 9157212522,
//                 "members": {
//                     "agent_id": "658bed167dd0bb526193617e",
//                     "name": "parmar",
//                     "mobile": 7622051689,
//                     "email": "shubhampatel12233@gmail.com",
//                     "dob": "2003-04-11T00:00:00.000Z",
//                     "_id": "659820d7797054275e022ae0"
//                 },
//                 "__v": 0
//             },
//             "agent": {
//                 "_id": "66073c9a09f5df02e6b9092a",
//                 "name": "Shubham Patel",
//                 "mobile": "7622051688",
//                 "email": "shubhampatel12233@gmail.com"
//             },
//             "company": {
//                 "_id": "659c68ab20de061edfa15294",
//                 "name": "HDFC",
//                 "url": "www.hdfc.com",
//                 "products": {
//                     "product_name": "HDFC LIFE",
//                     "product_type": "Individual",
//                     "company_agency": "658e63cdc91ffab61946cd2a",
//                     "policy_type": "health",
//                     "_id": "659c69d52398e0bddef78497"
//                 },
//                 "__v": 0
//             }
//         }
//     ],
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6NzYyMjA1MTY4OSwiZW1haWwiOiJzaHViaGFtcGF0ZWwxMjIzM0BnbWFpbC5jb20iLCJpYXQiOjE3MTU0MTk1MzgsImV4cCI6MTcxNTQyMzEzOH0.3TkkCVporW9-eB2qDdR0EkzUYYId_KG01s-JRngIUoE",
//     "type": "customer"
// }

const columns = [
    { title: "Policy Number" },
    { title: "Policy Type" },
    { title: "Bussiness Type" },
    { title: "Owner" },
    { title: "Company Name" },
    { title: "Agent Name" },
    { title: "Product Name" },
    { title: "Agency Name" },
    { title: "Details" }
];

const columnsForAgent = [
    { title: "Policy Number" },
    { title: "Policy Type" },
    { title: "Bussiness Type" },
    { title: "Owner" },
    { title: "Company Name" },
    { title: "Product Name" },
    { title: "Agency Name" },
    { title: "Details" }
];

const columnsForCustomer = [
    { title: "Policy Number" },
    { title: "Policy Type" },
    { title: "Bussiness Type" },
    { title: "Owner" },
    { title: "Company Name" },
    { title: "Agent Name" },
    { title: "Product Name" },
    { title: "Details" }
];

const GetPolicy = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [policies, setPolicies] = useState([]);
    const navigate = useNavigate();

    const usr = JSON.parse(Cookies.get('user') || null);
    // console.log(usr);

    useEffect(() => {

        const loadPolicy = async () => {
            setIsLoading(true)

            if (usr?.type === "admin") {
                const response = await getPolicies();

                // console.log(response?.data);
                if (response.status === 200) {
                    const data = response.data?.map((policy) => {
                        return [
                            policy.policy_number,
                            policy.policy_type,
                            policy.business_type,
                            policy.group?.members?.name,
                            policy.company?.name,
                            policy.agent?.name,
                            policy.company?.products?.product_name,
                            policy.company?.agencies?.name,
                            "/admin/policy/" + policy.policy_number
                        ];
                    });

                    // console.log(data);
                    setPolicies(data);
                    setIsLoading(false);
                } else {
                    alert('Something went wrong. Please try again later.')
                    setIsLoading(false);
                }
            }
            else if (usr?.type === "agent") {
                const response = await getAgentPolicies();

                // console.log(response?.data);
                if (response.status === 200) {
                    const data = response.data?.map((policy) => {
                        return [
                            policy.policy_number,
                            policy.policy_type,
                            policy.business_type,
                            policy.group?.members?.name,
                            policy.company?.name,
                            policy.company?.products?.product_name,
                            policy.company?.agencies?.name,
                            "/agent/policy/" + policy.policy_number
                        ];
                    });

                    // console.log(data);
                    setPolicies(data);
                    setIsLoading(false);
                } else {
                    alert('Something went wrong. Please try again later.')
                    setIsLoading(false);
                }

            }
            else if (usr?.type === "customer") {
                const policydata = await JSON.parse(localStorage.getItem('customerPolicies') || null);
                // console.log(policydata);

                if (policydata) {
                    const data = policydata?.map((policy) => {
                        return [
                            policy.policy_number,
                            policy.policy_type,
                            policy.business_type,
                            policy.group?.members?.name,
                            policy.company?.name,
                            policy.agent?.name,
                            policy.company?.products?.product_name,
                            // policy.company?.agencies?.name,
                            "/customer/policy/" + policy.policy_number
                        ];
                    });

                    // console.log(data);
                    setPolicies(data);
                    setIsLoading(false);
                }
            }
            else {
                alert('You are not logged in. Please login to continue.')
                navigate('/home')
                setIsLoading(false);
            }
        }
        (usr?.type === "admin") || (usr?.type === "agent") || (usr?.type === "customer")  ? loadPolicy() : setIsLoading(false);
    }, [])

    return (
        <Container>
            <TextContent>
                <Heading>Policies</Heading>
                <HoriZontalLine />
                {
                    isLoading ?
                        <div>
                            <Spinner height={100} color='#a273ff' />
                        </div>
                        :
                        ((policies.length > 0)) ?
                            usr?.type === "agent" ?
                                <CustomTable columns={columnsForAgent} dataSet={policies}
                                    // actionColumn={{ columnIndex: 3 }} 
                                    buttonColumns={[{ columnIndex: 7, buttonText: "Details" }]}
                                />
                                : 
                                usr?.type === "admin" ?
                                    <CustomTable columns={columns} dataSet={policies}
                                        // actionColumn={{ columnIndex: 3 }} 
                                        buttonColumns={[{ columnIndex: 8, buttonText: "Details" }]}
                                    />
                                : <CustomTable columns={columnsForCustomer} dataSet={policies}
                                    // actionColumn={{ columnIndex: 3 }}
                                    buttonColumns={[{ columnIndex: 7, buttonText: "Details" }]}
                                />
                            : <div>No Policies found</div>
                }
            </TextContent>
        </Container>
    )
}

export default GetPolicy
