import React, { useState, useEffect } from 'react'
import { getAgents, isLogged } from './../../services/Api'
import Spinner from './../../components/general/spinner'
import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import CustomTable from '../../components/general/table/table';

export const Container = tw.div`relative flex items-center justify-center p-8 bg-blue-100 min-h-screen`;
export const TextContent = tw.div`mx-auto w-full max-w-[1050px] px-12 py-8 bg-white rounded-2xl shadow-2xl shadow-blue-800 bg-white`;
export const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
export const Heading = tw(SectionHeading)`text-primary-500 mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
export const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;

const AgentList = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [AgentListData, setAgentListData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getAgents();
                // console.log(response?.data);

                if (response.status === 200) {
                    const data = response.data.map((agent) => {
                        return [
                            agent.name,
                            agent.email,
                            agent.mobile,
                            "/admin/agentProfile/" + agent._id,
                            // agent._id
                        ]
                    }
                    )
                    setAgentListData(data);
                } else {
                    alert('Something went wrong. Please try again later.')
                }
            }
            catch (err) {
                console.log(err);
                alert('Something went wrong. Please try again later.')
            } finally {
                setIsLoading(false);
            }
        }

        isLogged('admin') ? loadData() : setIsLoading(false);
    }, [])


    return (
        <Container>
            <TextContent>
                <Heading>Your Agents</Heading>
                <HoriZontalLine />

                {
                    !AgentListData.length > 0 ? <Spinner />
                        :
                        <CustomTable columns={[
                            { title: "Name" },
                            { title: "Email" },
                            { title: "Phone" },
                            { title: "Details" },
                        ]} dataSet={AgentListData} buttonColumns={[{ columnIndex: 3, buttonText: "View More" }]} />
                }
            </TextContent>
        </Container>
    )
}

export default AgentList
