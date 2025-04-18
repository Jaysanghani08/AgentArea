import React, { useState, useEffect, useRef } from 'react'
import { getFullAgent, isLogged } from './../services/Api'
import Spinner from './../components/general/spinner'
import { SectionHeading, Subheading as SubheadingBase } from "./../components/misc/Headings.js";
import tw from "twin.macro";
import CustomTable from './../components/general/table/table';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input as customInput, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from './../components/misc/form';
import { useLocation } from 'react-router-dom';


const Link = tw.a`text-primary-500 underline cursor-pointer`
const Input = tw(customInput)`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#000000] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-4`

const AgentProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [agentListData, setAgentListData] = useState([]);
    const agentId = useLocation().pathname.split('/')[3];


    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getFullAgent(agentId);
                // console.log(response?.data[0]);
                if (response.status === 200) {
                    // const data = Object.entries(response?.data[0]).map(([key, value]) => [key, value]);
                    // console.log(data);
                    setAgentListData(response.data[0]);
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
        isLogged('admin') || isLogged('agent') ? loadData() : setIsLoading(false);
    }, [])

    return (
        <Container>
            <TextContent>
                <Heading>Profile</Heading>
                <HoriZontalLine />

                <Form>
                    <Subheading>Personal Information</Subheading>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" name="name" value={agentListData.name} placeholder="Company Name" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="text" name="mobile" value={agentListData.mobile} placeholder="Mobile" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" value={agentListData.email} placeholder="Email" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" value={agentListData.username} placeholder="Username" disabled/>
                    </FormGroup>


                    {/* <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" value={agentListData.password} placeholder="Password" disabled/>
                    </FormGroup> */}

                    <FormGroup>
                        <Label htmlFor="address">Address</Label>
                        <Input type="text" name="address" value={agentListData.address} placeholder="Address" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="city">City</Label>
                        <Input type="text" name="city" value={agentListData.city} placeholder="City" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="state">State</Label>
                        <Input type="text" name="state" value={agentListData.state} placeholder="State" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="pin">PIN Code</Label>
                        <Input type="text" name="pin" value={agentListData.pin} placeholder="PIN" disabled/>
                    </FormGroup>

                    {/* <FormGroup>
                        <Label htmlFor="pan">PAN</Label>
                        <Input type="text" name="pan" value={agentListData.pan} placeholder="PAN" disabled/>
                    </FormGroup> */}

                    <FormGroup>
                        <Label htmlFor="bank">Bank</Label>
                        <Input type="text" name="bank" value={agentListData.bank} placeholder="Bank" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="micr">MICR</Label>
                        <Input type="text" name="micr" value={agentListData.micr} placeholder="MICR" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="accNumber">Account Number</Label>
                        <Input type="text" name="accNumber" value={agentListData.accNumber} placeholder="Account Number" disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="bankIFSC">Bank IFSC</Label>
                        <Input type="text" name="bankIFSC" value={agentListData.bankIFSC} placeholder="Bank IFSC" disabled/>
                    </FormGroup>

                    <Subheading>Documents</Subheading>
                    <FormGroup>
                        <Label htmlFor="aadhar">Aadhar</Label>
                        <Link href={agentListData?.docs?.aadhar} target="_blank" rel="noopener noreferrer">View Aadhar</Link>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="pan">pan</Label>
                        <Link href={agentListData?.docs?.pan} target="_blank" rel="noopener noreferrer">View PAN</Link>
                    </FormGroup>
                </Form>
                
            </TextContent>
        </Container>
    )
}

export default AgentProfile
