import React from "react";
import AnimationRevealPage from "./../../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "./../../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "./../../images/login-illustration.svg";
import logo from "./../../images/logo.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useAuth } from "../../context/AuthContext.js";
import { Navigate } from 'react-router-dom';

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

const Login = ({
    logoLinkUrl = "/",
    illustrationImageSrc = illustration,
    headingText = "Enter To Agent Area",
    socialButtons = [],
    SubmitButtonIcon = LoginIcon,
    forgotPasswordUrl = "#",
    signupUrl = "#",
}) => {

    const [Error, setError] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("+91"); // [countryCode, setCountryCode
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isOtpSent, setIsOtpSent] = React.useState(false);
    const [otp, setOtp] = React.useState("");
    const { login } = useAuth();
    const token = JSON.parse(sessionStorage.getItem('user'));

    if (token != null) {
        if (token.type === "admin")
            return <Navigate to="/admin"></Navigate>;
        else if (token.type === "agent")
            return <Navigate to="/agent"></Navigate>;
        else if (token.type === "client")
            return <Navigate to="/client" ></Navigate>
    }

    const onChangeCountryCode = (e) => {

        const regex = /^[+][0-9]{1,3}$/;
        if (regex.test(e.target.value)) {
            setError("");
        }
        else {
            setError("Invalid Country Code");
        }

        setCountryCode(e.target.value);
    }

    const onChangePhone = (e) => {

        const regex = /^[0-9]{10}$/;
        if (regex.test(e.target.value)) {
            setError("");
        }
        else {
            setError("Invalid Phone Number");
        }

        setPhone(e.target.value);
    }

    const onChangePassword = (e) => {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~\\-]).{8,}$/
        if (regex.test(e.target.value)) {
            setError("");
        }
        else if (e.target.value.length < 8) {
            setError("Password must be min. 8 characters long");
        }
        else {
            setError("Please Enter Strong Password");
        }

        setPassword(e.target.value);
    }

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (phone.length === 0) {
            setError("Please Enter Phone Number");
        }
        else if (password.length === 0) {
            setError("Please Enter Password");
        }

        setIsOtpSent(true);
    }

    const onChangeOtp = (e) => {

        const regex = /^[0-9]{4}$/;
        if (regex.test(e.target.value)) {
            setError("");
        }
        else if (e.target.value.length !== 4) {
            setError("OTP must be 4 digits long");
        }
        else if (!regex.test(e.target.value)) {
            setError("OTP must be Numeric Values Only");
        }

        setOtp(e.target.value);
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (otp.length === 0) {
            setError("Please Enter OTP");
        }
        else {
            setError("Invalid OTP");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (countryCode.length === 0) {
            setError("Please Enter Country Code");
        }
        else if (phone.length === 0) {
            setError("Please Enter Phone Number");
        }
        else if (password.length === 0) {
            setError("Please Enter Password");
        }
        else {
            setError("");
        }

        try {
            const type = window.location.pathname.split("/")[1];
            alert(type);
            const res = await login({ id: phone, password }, type);
            // console.log(token);
            if (res.status === 200 && token != null){
                setError("");
            }
            else if (res.status === 202) {
                setError("Invalid Credentials");
            }
            else if (res.status === 404) {
                setError("User Not Found");
            }
            else if (res.status === 400) {
                setError("Server Error");
            }
        }
        catch (error) {
            setError("Invalid Credentials");
        }
    }

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
                                    {/* <Input type="text" placeholder="Country Code (ex : +91 for India)" value={countryCode} onChange={onChangeCountryCode} /> */}
                                    <Input type="text" placeholder="Phone No." onChange={onChangePhone} />
                                    <Input type="password" placeholder="Password" onChange={onChangePassword} />
                                    {Error && <ErrorContainer> {Error} </ErrorContainer>}
                                    <SubmitButton onClick={handleSubmit} >
                                        <SubmitButtonIcon className="icon" />
                                        <span className="text">Login</span>
                                    </SubmitButton>
                                    {/* {
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
                                    } */}
                                </Form>
                                <p tw="mt-6 text-xs text-gray-600 text-center">
                                    <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                                        Forgot Password ?
                                    </a>
                                </p>
                                <p tw="mt-8 text-sm text-gray-600 text-center">
                                    Dont have an account?{" "}
                                    <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                                        Sign Up
                                    </a>
                                </p>
                            </FormContainer>

                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage>
    );
}


export default Login;