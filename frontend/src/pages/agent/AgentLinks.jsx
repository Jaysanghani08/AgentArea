import React from 'react'
import { Link } from 'react-router-dom'
import tw from "twin.macro";
import { useAuth } from "../../context/AuthContext.js";
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import styled from "styled-components";

const Container = tw.div`relative flex flex-col items-center p-12`;

const AgentLinks = () => {
    
    const usr = JSON.parse(Cookies.get('user') || null);;

    if(usr?.agentData?.changed === 0){
        return <Navigate to={"/agent/updatePassword/" + usr?.agentData?.mobile} ></Navigate>
    }

    if(usr?.type !== "agent"){
        Cookies.remove('user');
        return <Navigate to="/agent/login"></Navigate>
    }

    return (
        <Container>
            <Link to={"/agent/agentProfile/" + usr?.agentData?._id}>Agent Profile</Link>
            <Link to="/agent/addpolicy">Add Policy</Link>
            <Link to="/agent/getpolicy">Get Policy</Link>
            {/* <Link to="/agent/tmp">Tmp</Link> */}
        </Container>
    )
}

export default AgentLinks
