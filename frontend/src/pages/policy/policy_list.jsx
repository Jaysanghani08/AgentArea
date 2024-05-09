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

const GetPolicy = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [policies, setPolicies] = useState([]);
    const navigate = useNavigate();

    const usr = JSON.parse(Cookies.get('user') || null);
    console.log(usr);   

    useEffect(() => {

        const loadPolicy = async () => {
            setIsLoading(true)

            if (usr?.type === "admin") {
                const response = await getPolicies();

                console.log(response?.data);
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

                    console.log(data);
                    setPolicies(data);
                    setIsLoading(false);
                } else {
                    alert('Something went wrong. Please try again later.')
                    setIsLoading(false);
                }
            }
            else if(usr?.type === "agent") {
                const response = await getAgentPolicies();

                console.log(response?.data);
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
                            "/agent/policy/" + policy.policy_number
                        ];
                    });

                    console.log(data);
                    setPolicies(data);
                    setIsLoading(false);
                } else {
                    alert('Something went wrong. Please try again later.')
                    setIsLoading(false);
                }

            }
            else {
                alert('You are not logged in. Please login to continue.')
                navigate('/home')
                setIsLoading(false);
            }
        }
        isLogged('admin') || isLogged("agent") ? loadPolicy() : setIsLoading(false);
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
                        ((policies.length > 0)) ? <CustomTable columns={columns} dataSet={policies}
                            // actionColumn={{ columnIndex: 3 }} 
                            buttonColumns={[{ columnIndex: 8, buttonText: "Details" }]}
                        />
                            : <div>No Policies found</div>
                }
            </TextContent>
        </Container>
    )
}

export default GetPolicy
