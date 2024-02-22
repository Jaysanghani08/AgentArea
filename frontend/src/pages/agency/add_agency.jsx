import React, { useState } from 'react'
import { addAgency } from '../../services/Api';
import Spinner from '../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from './../../components/misc/form';


const AddAgency = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: '659c68ab20de061edfa15294',
        name: '',
        code: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setIsLoading(true);

        try {
            const response = await addAgency(formData);

            if (response.status === 200) {
                alert('Agency created successfully');
            }
            else {
                alert('Error creating agency')
            }
        } catch (error) {
            console.log(error);
            alert('Error creating agency')
        } finally {
            setIsLoading(false);
        }
    }

    const heading = <> Create new <span className="text-primary-500">Agency</span></>;
    const submitButtonText = isLoading ? <Spinner height={20} color='#000000' /> : 'Create Agency';

    return (
        <Container>
            <TextContent>
                <Heading>{heading}</Heading>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Agency Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="name" placeholder="Agency Name" onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>

                        <Label htmlFor="url">Code <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="code" placeholder="Code" onChange={handleChange} />
                    </FormGroup>

                    <SubmitButton>{submitButtonText}</SubmitButton>
                </Form>
            </TextContent>
        </Container>
    )
};

export default AddAgency;