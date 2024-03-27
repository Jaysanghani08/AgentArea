import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import tw from "twin.macro";
import Cookies from 'js-cookie';
import { logOut } from '../../services/Api';
// import styled from "styled-components";
import { SubmitButton, Subheading, Container, TextContent, Heading } from './../../components/misc/form';
import { useAuth } from '../../context/AuthContext';

const CustomContainer = tw.div`relative flex flex-col flex-wrap items-center justify-start p-12 bg-white min-h-full`;
const FlexContainer = tw(Container)`relative flex justify-center flex-wrap items-start p-12 bg-white min-h-full`;
const FlexContainer2 = tw.div`relative flex items-center justify-between flex-wrap p-12 bg-white max-h-[200px]`;
const CustomLink = tw(Link)`text-gray-800 text-lg font-semibold mt-2 hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500`;
const CustomSubheading = tw(Subheading)`mt-4 text-xl font-semibold mb-0 border-b-2 border-gray-500 pb-1`;
const CustomHeading = tw(Heading)`mt-2 font-black text-center text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Links = () => {

    const usr = JSON.parse(Cookies.get('user') || null)
    const navigate = useNavigate();
    const { logout } = useAuth()

    if (usr?.type !== "admin") {
        Cookies.remove('user');
        return <Navigate to="/admin/login"></Navigate>
    }

    const handleLogout = async () => {
        const res = await logout();
        if (res === true) {
            Cookies.remove('user');
            navigate("/home")
        }
    }

    return (
        <Container>
            <TextContent>

                <FlexContainer2>
                    <CustomHeading>Admin</CustomHeading>
                    <SubmitButton onClick={handleLogout}>Logout</SubmitButton>
                </FlexContainer2>

                <FlexContainer>
                    <CustomContainer>
                        <CustomSubheading>Policy</CustomSubheading>
                        <CustomLink to="/admin/policylist">Policy List</CustomLink>
                    </CustomContainer>

                    <CustomContainer>
                        <CustomSubheading>Agent</CustomSubheading>
                        <CustomLink to="/admin/addagent">Add Agent</CustomLink>
                        <CustomLink to="/admin/agentlist">AgentList</CustomLink>
                    </CustomContainer>

                    <CustomContainer>
                        <CustomSubheading>Company & Products</CustomSubheading>
                        <CustomLink to="/admin/addcompany">Add Company</CustomLink>
                        <CustomLink to="/admin/companylist">CompanyList</CustomLink>
                        <CustomLink to="/admin/addagency">Add Agency</CustomLink>
                        <CustomLink to="/admin/addproduct">Add Product</CustomLink>
                    </CustomContainer>

                </FlexContainer>
            </TextContent>
        </Container>
    )
}

export default Links
