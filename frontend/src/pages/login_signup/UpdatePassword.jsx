import React,{useState} from 'react'
import {Navigate, useNavigate } from 'react-router-dom';
import { Container, TextContent, Subheading, Heading, Form, FormGroup, Select, Label, RequiredIndicator, Input, SubmitButton } from '../../components/misc/form';
import { updatePassword } from '../../services/Api';
import Cookies from 'js-cookie';

const UpdatePassword = () => {

    const mobile = window.location.pathname.split("/")[3];

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile: mobile,
        old: '',
        new: '',
        confirmpas: ''
    });

    if (!mobile) {
        alert("Invalid URL");
        return <Navigate to="/agent/login"></Navigate>
    }

    const isValidMobile = /^\d{10}$/.test(mobile);
    if (!isValidMobile) {
        alert("Invalid mobile number");
        return <Navigate to="/agent/login"></Navigate>
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.new !== formData.confirmpas) {
            alert("Passwords do not match");
            return;
        }

        const response = await updatePassword(formData);
        console.log(response);
        alert("Password updated successfully");
        Cookies.remove('user');
        window.location.href = "/agent/login";
        // if(response.status === 200){
        //     alert("Password updated successfully");
        // }
        // else{
        //     alert("Invalid old password");
        // }

    }

    return (
        <Container>
            <TextContent>
                <Heading>Update Your Password</Heading>

                <Form onSubmit={handleSubmit}>
                    <Subheading>Enter details</Subheading>

                    {/* mobile */}
                    <FormGroup>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input type="text" name="mobile" value={mobile} disabled />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="old">Old Password</Label>
                        <Input type="password" name="old" value={formData.old} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="new">New Password</Label>
                        <Input type="password" name="new" value={formData.new} onChange={handleChange} required />
                    </FormGroup>

                    {/* confirm password */}
                    <FormGroup>
                        <Label htmlFor="confirmpas">Confirm Password</Label>
                        <Input type="password" name="confirmpas" value={formData.confirmpas} onChange={handleChange} required />
                    </FormGroup>

                    <SubmitButton>Submit</SubmitButton>
                </Form>
            </TextContent>
        </Container>
    );
}

export default UpdatePassword
