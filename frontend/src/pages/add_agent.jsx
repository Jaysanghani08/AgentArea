import React, { useState } from 'react'
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "./../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "./../components/misc/Buttons.js";
import Spinner from './../components/general/spinner';
import { AgentSignup } from './../services/Api';


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-0 md:py-0`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 mt-0 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const TextContent = tw.div`lg:py-2 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Form = tw.form`mt-4 md:mt-4 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-5 first:mt-0 border-b-2 py-3 focus:outline-none font-semibold transition duration-300`
const FileLabel = tw.label` pt-5 font-semibold`
const FileInput = tw.input`mt-0 first:mt-0 border-b-2 py-3 focus:outline-none font-semibold transition duration-300`
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}`

const SubmitButton = tw(PrimaryButtonBase)`flex justify-center items-center inline-block mt-8`

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

    const subheading = "Agent Signup";
    const heading = <>Create an <span className="text-primary-500">Agent</span></>;
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const submitButtonText = isLoading ? <Spinner height={20}/> : 'Sign in';
    const formAction = "#";
    const formMethod = "get";

    return (
        <Container>
            {/* <TwoColumn> */}
                {/* <ImageColumn> */}
                {/* <Image imageSrc={EmailIllustrationSrc} /> */}
                {/* </ImageColumn> */}
                <TextColumn>
                    <TextContent>
                        {subheading && <Subheading>{subheading}</Subheading>}
                        <Heading>{heading}</Heading>
                        {/* {description && <Description>{description}</Description>} */}

                        <Form  onSubmit={handleSubmit}>
                            <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
                            <Input type="text" name="mobile" placeholder="Mobile No." onChange={handleChange} />
                            <Input type="email" name="email" placeholder="Your Email Address" onChange={handleChange} />
                            <Input type="text" name="username" placeholder="Username" onChange={handleChange} />
                            <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <Textarea type="text" name="address" placeholder="Address" onChange={handleChange} />
                            <Input type="text" name="city" placeholder="City" onChange={handleChange} />
                            <Input type="text" name="state" placeholder="State" onChange={handleChange} />

                        {/* </Form>
                    </TextContent>
                </TextColumn>
                <TextColumn>
                    <TextContent>
                        <Form> */}
                            <Input type="text" name="pin" placeholder="PIN Code" onChange={handleChange} />
                            <Input type="text" name="panNumber" placeholder="PAN Number" onChange={handleChange} />
                            <Input type="text" name="bank" placeholder="Bank Name" onChange={handleChange} />
                            <Input type="text" name="bankAccType" placeholder="Account Type" onChange={handleChange} />
                            <Input type="text" name="accNumber" placeholder="Account Number" onChange={handleChange} />
                            <Input type="text" name="bankIFSC" placeholder="Bank IFSC" onChange={handleChange} />
                            <Input type="text" name="micr" placeholder="MICR Code" onChange={handleChange} />
                            <FileLabel > Aadhar </FileLabel>
                            <FileInput type="file" name="aadharFile" placeholder="Aadhar Card" onChange={handleAadharFileChange} accept=".jpg, .jpeg, .png, .pdf" />
                            <FileLabel > PAN </FileLabel>
                            <FileInput type="file" name="panDoc" placeholder="PAN Card" onChange={handlePanFileChange} accept=".jpg, .jpeg, .png, .pdf" />
                            <SubmitButton type='submit' className="btn btn-primary flex justify-center items-center" >{submitButtonText}</SubmitButton>
                        </Form>
                    </TextContent>
                </TextColumn>
            {/* </TwoColumn> */}
        </Container >
    )
};

export default AddAgent;