import React from 'react'
import { Link } from 'react-router-dom'
import tw from "twin.macro";
import { useAuth } from "../../context/AuthContext.js";
import { Navigate } from 'react-router-dom';
// import styled from "styled-components";

const Container = tw.div`relative flex flex-col items-center p-12`;

const AgentLinks = () => {
    const {user} = useAuth();
    console.log(user);
    if(user?.type !== "agent"){
        sessionStorage.removeItem('user');
        return <Navigate to="/agent/login"></Navigate>
    }

    return (
        <Container>
            <Link to="/admin/agentProfile">Agent Profile</Link>
            <Link to="/admin/addcompany">Add Company</Link>
            <Link to="/admin/companylist">CompanyList</Link>
            <Link to="/admin/addpolicy">Add Policy</Link>
            <Link to="/admin/getpolicy">Get Policy</Link>
            {/* <Link to="/admin/tmp">Tmp</Link> */}
        </Container>
    )
}

export default AgentLinks
