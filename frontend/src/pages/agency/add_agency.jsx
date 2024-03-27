import React, { useEffect, useState } from 'react'
import { addAgency, isLogged } from '../../services/Api';
import Spinner from '../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, Form, FormGroup, Select, Label, RequiredIndicator, Input, SubmitButton } from './../../components/misc/form';
import { getCompanies } from '../../services/Api';

const AddAgency = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [companydata, setCompanyData] = useState([]);

    useEffect(() => {
        const loadCompany = async () => {
            setIsLoading(true);
            const response = await getCompanies();
            // console.log(response?.data);
            if (response.status === 200) {
                setCompanyData(response.data);
            }
            else {
                alert('Error fetching companies')
            }
            setIsLoading(false);
        }

        isLogged("admin") ? loadCompany() : isLoading(false);
    }, []);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        code: ''
    });

    console.log(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setIsLoading(true);

        try {
            const response = await addAgency(formData);
            // console.log(response);
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
                    <Subheading>Agency Information</Subheading>

                    {
                        isLoading ? <Spinner height={100} color='#a273ff' />
                            : null
                    }

                    {
                        companydata.length > 0 ?
                            <FormGroup>
                                <Label htmlFor="company">Company <RequiredIndicator>*</RequiredIndicator></Label>
                                <Select name="id" onChange={handleChange}>
                                    <option value="">Select Company</option>
                                    {
                                        companydata.map((company) => {
                                            return <option value={company._id}>{company.name}</option>
                                        })
                                    }
                                </Select>
                            </FormGroup> : null
                    }

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