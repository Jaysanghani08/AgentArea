import React,{useState} from 'react'
import {Navigate, useNavigate } from 'react-router-dom';
import { Container, TextContent, Subheading, Heading, Form, FormGroup, Select, Label, RequiredIndicator, Input, SubmitButton } from '../../components/misc/form';
import { forgetPassword, sendOtpToFp, verifyOtpTOFp } from '../../services/Api';
import Cookies from 'js-cookie';

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const [formData, setFormData] = useState({
        mobile: '',
        email: '',
        password: '',
        confirmpas: ''
    });

    const isValidMobile = /^\d{10}$/.test(formData.mobile);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpas) {
            alert("Passwords do not match");
            return;
        }

        const response = await forgetPassword(formData);
        // console.log(response);

        if(response.status === 200){
            alert("Password updated successfully");
            Cookies.remove('user');
            window.location.href = "/agent/login";
        }
        else{
            alert("Something Went Wrong. Retry.");
        }
    }

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!isValidMobile) {
            alert("Invalid mobile number");
            return;
        }
        
        const response = await sendOtpToFp(formData);
        // console.log(response)
        if(response.status === 200){
            alert("OTP sent successfully");
            setIsOtpSent(true);
        }
        else if(response.status === 404){   
            alert("Email not found. Retry.");
        }
        else if(response.status === 203){
            alert("Invalid credentials. Retry.");
        }
        else if(response.status === 500){
            alert("Internal server error. Retry.");
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();

        const response = await verifyOtpTOFp({otp: otp, email : formData.email});
        // console.log(response)

        if(response.status === 200){
            alert("OTP verified successfully");
            setIsOtpVerified(true);
        }
        else if(response.status === 500){
            alert("OTP Expired. Retry.");
            window.location.reload();
        }
        else if(response.status === 288){
            alert("Invalid Otp. Retry.");
            setOtp('')
        }
        else if(response.status === 400){
            alert("Internal server error. Retry.");
        }
    }



    return (
        <Container>
            <TextContent>
                <Heading>Forget Password</Heading>

                <Form>
                    <Subheading>Enter details</Subheading>

                    {/* mobile */}
                    <FormGroup>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="text" name="mobile" onChange={handleChange} value={formData.mobile} required/>
                    </FormGroup>

                    {/* email */}
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </FormGroup>


                    {   
                        !isOtpSent ?
                        <SubmitButton onClick={handleSendOtp}>Send OTP</SubmitButton>
                        : null
                    }

                    {   
                        isOtpSent && !isOtpVerified ?
                        <FormGroup>
                            <Label htmlFor="otp">OTP</Label>
                            <Input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        </FormGroup>
                        :
                        null
                    }

                    {
                        isOtpSent && !isOtpVerified ?
                        <SubmitButton onClick={verifyOtp}>Verify OTP</SubmitButton>
                        :   null
                    }

                    {
                        isOtpSent && isOtpVerified ?
                        <>              
                        <Subheading>Enter new password</Subheading>          
                        <FormGroup>
                            <Label htmlFor="password">New Password</Label>
                            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="confirmpas">Confirm Password</Label>
                            <Input type="password" name="confirmpas" value={formData.confirmpas} onChange={handleChange} required />
                        </FormGroup>

                        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                        </>
                        : null

                    }

                </Form>
            </TextContent>
        </Container>
    );

}

export default ForgetPassword
