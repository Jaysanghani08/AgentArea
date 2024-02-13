import React from 'react'
import { Link } from 'react-router-dom'
import tw from "twin.macro";
// import styled from "styled-components";

const Container = tw.div`relative flex flex-col items-center p-12`;

const Links = () => {
    return (
        <Container>
            <Link to="/home">Home</Link>
            <Link to="/login" > Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/addagent">Add Agent</Link>
            <Link to="/agentProfile">Agent Profile</Link>
            <Link to="/agentlist">AgentList</Link>
            <Link to="/addcompany">Add Company</Link>
            <Link to="/companylist">CompanyList</Link>
            <Link to="/addagency">Add Agency</Link>
            <Link to="/addproduct">Add Product</Link>
            <Link to="/addpolicy">Add Policy</Link>
            <Link to="/getpolicy">Get Policy</Link>
            <Link to="/tmp">Tmp</Link>
        </Container>
    )
}

export default Links
