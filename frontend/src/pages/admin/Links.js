import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import tw from "twin.macro";
import { useAuth } from "../../context/AuthContext.js";
// import styled from "styled-components";

const Container = tw.div`relative flex flex-col items-center p-12`;

const Links = () => {
    const {user} = useAuth();
    console.log(user);
    if(user?.type !== "admin"){
        sessionStorage.removeItem('user');
        return <Navigate to="/admin/login"></Navigate>
    }

    return (
        <Container>
            {/* <Link to="/home">Home</Link> */}
            {/* <Link to="/login" > Login</Link> */}
            {/* <Link to="/signup">Signup</Link> */}
            <Link to="/admin/addagent">Add Agent</Link>
            <Link to="/admin/agentProfile">Agent Profile</Link>
            <Link to="/admin/agentlist">AgentList</Link>
            <Link to="/admin/addcompany">Add Company</Link>
            <Link to="/admin/companylist">CompanyList</Link>
            <Link to="/admin/addagency">Add Agency</Link>
            <Link to="/admin/addproduct">Add Product</Link>
            {/* <Link to="/admin/addpolicy">Add Policy</Link> */}
            <Link to="/admin/getpolicy">Get Policy</Link>
            {/* <Link to="/admin/tmp">Tmp</Link> */}
        </Container>
    )
}

export default Links
