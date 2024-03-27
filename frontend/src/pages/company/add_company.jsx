import React, { useState } from 'react'
import { addCompany, isLogged } from '../../services/Api';
import Spinner from '../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from './../../components/misc/form';

const AddAgent = () => {
    const [isLoading, setIsLoading] = useState(false);

    if(!isLogged('admin')){
        alert('You are not logged in. Please login to continue')
    }

    const [formData, setFormData] = useState({
        name: '',
        url: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await addCompany(formData);

            if (response.status === 200) {
                alert('Company created successfully');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <TextContent>
                <Heading>Create new <span className="text-primary-500">Company</span></Heading>

                    <Subheading>Company Information</Subheading>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Company Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="name" placeholder="Company Name" onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="url">Website URL <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="url" name="url" placeholder="Website URL" onChange={handleChange} />
                    </FormGroup>

                    <SubmitButton>{isLoading ? <Spinner height={20} color='#000000' /> : 'Create Company'}</SubmitButton>
                </Form>
            </TextContent>
        </Container>
    )
};

export default AddAgent;