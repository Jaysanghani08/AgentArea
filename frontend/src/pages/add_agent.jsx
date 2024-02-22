import React, { useState } from 'react'
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from './../components/misc/form';
import Spinner from './../components/general/spinner';
import { AgentSignup } from './../services/Api';

const AddAgent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        username: '',
        password: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        panNumber: '',
        bank: '',
        bankAccType: '',
        micr: '',
        accNumber: '',
        bankIFSC: '',
    });

    const [aadharFile, setAadharFile] = useState(null);
    const [panFile, setPanFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAadharFileChange = (event) => {
        setAadharFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handlePanFileChange = (event) => {
        setPanFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('mobile', formData.mobile);
        data.append('email', formData.email);
        data.append('username', formData.username);
        data.append('password', formData.password);
        data.append('address', formData.address);
        data.append('city', formData.city);
        data.append('state', formData.state);
        data.append('pin', formData.pin);
        data.append('panNumber', formData.panNumber);
        data.append('bank', formData.bank);
        data.append('bankAccType', formData.bankAccType);
        data.append('micr', formData.micr);
        data.append('accNumber', formData.accNumber);
        data.append('bankIFSC', formData.bankIFSC);
        data.append('aadharFile', aadharFile);
        data.append('panFile', panFile);
        console.log(data);

        try {
            const response = await AgentSignup(data);
            console.log(response);
            if (response.status === 200) {
                alert('Agent created successfully');
            } else if (response.status === 410) {
                alert('Email already exists');
            } else if (response.status === 411) {
                alert('Mobile already exists');
            } else if (response.status === 412) {
                alert('Username already exists');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const heading = <> Create new <span className="text-primary-500">Agent</span></>;
    const submitButtonText = isLoading ? <Spinner height={20} color='#000000' /> : 'Create Agent';

    return (
        <Container>
            <TextContent>
                <Heading>{heading}</Heading>
                {/* {description && <Description>{description}</Description>} */}

                <Form onSubmit={handleSubmit}>
                    <Subheading>Personal Details</Subheading>
                    <FormGroup>
                        <Label htmlFor="name">Full Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="mobile">Mobile No. <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="mobile" placeholder="Mobile No." onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="email" name="email" placeholder="Your Email Address" onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="username">Username <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="text" name="username" placeholder="Username" onChange={handleChange} />
                        <Gap />
                        <Label htmlFor="password">Password <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="password" name="password" placeholder="Password" onChange={handleChange} />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="panNumber">PAN Number <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="panNumber" placeholder="PAN Number" onChange={handleChange} />
                    </FormGroup>

                    <HoriZontalLine />
                    <Subheading>Address Details</Subheading>
                    <FormGroup>
                        <Label htmlFor="address">Address <RequiredIndicator>*</RequiredIndicator></Label>
                        <Textarea type="text" name="address" placeholder="Address" onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="city">City <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="text" name="city" placeholder="City" onChange={handleChange} />
                        <Gap />
                        <Label htmlFor="state">State <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="text" name="state" placeholder="State" onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="pin">PIN Code <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="pin" placeholder="PIN Code" onChange={handleChange} />
                    </FormGroup>
                    
                    <HoriZontalLine />
                    <Subheading>Bank Details</Subheading>
                    <FormGroup>
                        <Label htmlFor="bank">Bank Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="bank" placeholder="Bank Name" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="bankAccType">Account Type <RequiredIndicator>*</RequiredIndicator></Label>
                        {/* < type="text" name="bankAccType" placeholder="Account Type" onChange={handleChange} /> */}
                        <HalfSelect name="bankAccType" onChange={handleChange}>
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                        </HalfSelect>
                        <Gap />
                        <Label htmlFor="accNumber">Account Number <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="text" name="accNumber" placeholder="Account Number" onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="bankIFSC">Bank IFSC <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="text" name="bankIFSC" placeholder="Bank IFSC" onChange={handleChange} />
                        <Gap />
                        <Label htmlFor="micr">MICR Code <RequiredIndicator>*</RequiredIndicator></Label>
                        <HalfInput type="text" name="micr" placeholder="MICR Code" onChange={handleChange} />
                    </FormGroup>
                    <HoriZontalLine />

                    <Subheading>Upload Documents</Subheading>
                    <FormGroup>
                        <Label htmlFor="aadharFile">Aadhar Card <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="file" name="aadharFile" placeholder="Aadhar Card" onChange={handleAadharFileChange} accept=".jpg, .jpeg, .png, .pdf" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="panDoc">PAN Card <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="file" name="panDoc" placeholder="PAN Card" onChange={handlePanFileChange} accept=".jpg, .jpeg, .png, .pdf" />
                    </FormGroup>
                    <SubmitButton type='submit' className="btn btn-primary flex justify-center items-center" >{submitButtonText}</SubmitButton>
                </Form>
            </TextContent>
            {/* </TwoColumn> */}
        </Container >
    )
};

export default AddAgent;