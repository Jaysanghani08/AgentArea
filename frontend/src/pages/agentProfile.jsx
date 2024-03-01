import React, { useState, useEffect, useRef } from 'react'
import { getFullAgent } from './../services/Api'
import Spinner from './../components/general/spinner'
import { SectionHeading, Subheading as SubheadingBase } from "./../components/misc/Headings.js";
import tw from "twin.macro";
import CustomTable from './../components/general/table/table';

export const Container = tw.div`relative flex items-center justify-center p-8`;
export const TextContent = tw.div`mx-auto w-full max-w-[1050px] bg-white`;
export const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
export const Heading = tw(SectionHeading)`text-primary-500 mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
export const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;

// response.data[0] = {
//     "_id": "658bed167dd0bb526193617e",
//     "name": "Shubham",
//     "mobile": "7622051688",
//     "email": "shubhampatel13495@gmail.com",
//     "username": "shubham464",
//     "password": "$2a$08$zp5a3.kTfNbmgXtfDP8sm.YSDlZkFG.HWmFVb0xSgdDR0pdmbOPWq",
//     "address": "abcdefgh",
//     "city": "kadi",
//     "state": "Gujrat",
//     "pin": 382715,
//     "pan": "$2a$08$t8TCfWLeIHKPLTVrT2j5T.FTfTvPBWEr.TLU0p7t35F9tbkl/4I76",
//     "bank": "HDFC",
//     "micr": "123456789asdfg",
//     "accNumber": 1234567890,
//     "bankIFSC": "asdfg1234567",
//     "__v": 0
// }

const dummyFormData = {
    name: 'John Doe',
    mobile: '9876543210',
    email: 'john.doe@example.com',
    username: 'johndoe123',
    password: 'password123',
    address: '123 Main Street',
    city: 'Anytown',
    state: 'State',
    pin: '12345',
    pan: 'ABCDE1234F',
    bank: 'XYZ Bank',
    bankAccType: 'Savings',
    micr: '123456789',
    accNumber: '9876543210',
    bankIFSC: 'XYZ1234567',
    docs: [
        {
            aadhar: '1234 5678 9012',
            pan: 'ABCDE1234F',
        }
    ]
};

const AgentProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [agentListData, setAgentListData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getFullAgent('658bed167dd0bb526193617e');
                console.log(response?.data[0]);
                if (response.status === 200) {
                    const data = Object.entries(response?.data[0]).map(([key, value]) => [key, value]);
                    console.log(data);
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
        loadData();
    }, [])

    return (
        <Container>
            <TextContent>
                <Heading>Your Agents</Heading>
                <HoriZontalLine />

                {
                    !agentListData.length > 0 ? <Spinner />
                        :
                        <CustomTable columns={[
                            { title: "Key" },
                            { title: "Value" },
                        ]} dataSet={agentListData} />
                        // <></>
                }
            </TextContent>
        </Container>
    )
}

export default AgentProfile
