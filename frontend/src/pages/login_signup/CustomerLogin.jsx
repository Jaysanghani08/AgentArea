import React from 'react'
import AnimationRevealPage from "./../../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "./../../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "./../../images/login-illustration.svg";
import logo from "./../../images/logo.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useAuth } from "../../context/AuthContext.js";
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {customerLogin, customerVerifyOTP} from './../../services/Api.js'

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;
const ErrorContainer = tw.div`text-red-500 text-xs mt-1 pl-8 border py-1 rounded-sm border-red-500 bg-red-100 `;


const CustomerLogin = (
    {
        logoLinkUrl = "/",
        illustrationImageSrc = illustration,
        headingText = "Enter To Agent Area",
        socialButtons = [],
        SubmitButtonIcon = LoginIcon,
        forgotPasswordUrl = "#",
        signupUrl = "#",
    }
) => {

    const [Error, setError] = React.useState("");
    const [formdata, setFormdata] = React.useState({
        group_id: "",
        mobile: "",
        email: ""
    });
    const [isOtpSent, setIsOtpSent] = React.useState(false);
    const [otp, setOtp] = React.useState("");


    const onChangeFormdata = (e) => {

        const regex = /^[0-9]{10}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (e.target.name === "group_id") {
            if(regex.test(e.target.value)) setError("");
            else setError("Invalid Group Code");
        }
        else if (e.target.name === "mobile" && regex.test(e.target.value)) {
            if(regex.test(e.target.value)) setError("");
            else setError("Invalid Phone Number");
        }
        else if (e.target.name === "email") {
            if(emailRegex.test(e.target.value)) setError("");
            else setError("Invalid Email");
        }
        else {
            setError("Invalid Input");
        }

        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    }

    const onChangeOtp = (e) => {
        setOtp(e.target.value);
    }

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (Error) {
            return;
        }
        const data = {
            group_id: formdata.group_id,
            mobile: formdata.mobile,
            email: formdata.email
        }
        // console.log(data);
        const response = await customerLogin(data);
        if(response.status === 200) {
            alert("OTP sent successfully");
            setIsOtpSent(true);
        }
        else if(response.status === 400) {
            setError(response.data.message);
        }
        else {
            setError("Invalid Credentials");
        }
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        const data = {
            group_id: formdata.group_id,
            mobile: formdata.mobile,
            email: formdata.email,
            otp: otp
        }

        // console.log(data)
        const response = await customerVerifyOTP(data);
        // console.log(response);

        if(response.status === 200) {
            alert("Login Successfull");
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (1 * 30 * 60 * 1000));
            
            // console.log(response.data);
            Cookies.set('user', JSON.stringify({"type" : response.data?.type}), { secure: true, sameSite: 'strict', expires: expirationDate });
            localStorage.setItem('customerPolicies', JSON.stringify(response.data?.data));

            // console.log(localStorage.getItem('customerPolicies'));
            navigate('/customer/policylist');
            // window.location.reload();
        }
        else if(response.status === 288) {
            setError("Invalid OTP");
        }
        else {
            setError("Invalid Credentials");
        }
        
    }

    const navigate = useNavigate();
    const { user } = useAuth();
    if (user && user.type === "customer") {
        // navigate('/home');
    }

    const submitButtonText = isOtpSent ? "Submit OTP" : "Send OTP";

    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <MainContainer>
                        <LogoLink href={logoLinkUrl}>
                            <LogoImage src={logo} />
                        </LogoLink>
                        <MainContent>
                            <Heading>{headingText}</Heading>
                            <FormContainer>
                                <Form>
                                    <Input type="text" name='group_id' placeholder="Group Code" onChange={onChangeFormdata} />
                                    <Input type="text" name='mobile' placeholder="Mobile No." onChange={onChangeFormdata} />
                                    <Input type="email" name='email' placeholder="Email" onChange={onChangeFormdata} />
                                    {Error && <ErrorContainer> {Error} </ErrorContainer>}
                                    {
                                        isOtpSent &&
                                        <Input type="text" placeholder="OTP" onChange={onChangeOtp} />
                                    }

                                    {
                                        !isOtpSent ?
                                            <SubmitButton onClick={handleSendOtp} >
                                                <SubmitButtonIcon className="icon" />
                                                <span className="text">{submitButtonText}</span>
                                            </SubmitButton>
                                            :
                                            <>
                                                <SubmitButton onClick={handleOtpSubmit} >
                                                    <SubmitButtonIcon className="icon" />
                                                    <span className="text">Login</span>
                                                </SubmitButton>
                                            </>
                                    }
                                </Form>
                                {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                                <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                                    Forgot Password ?
                                </a>
                            </p>
                            <p tw="mt-8 text-sm text-gray-600 text-center">
                                Dont have an account?{" "}
                                <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                                    Sign Up
                                </a>
                            </p> */}
                            </FormContainer>

                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage>
    )
}

export default CustomerLogin
