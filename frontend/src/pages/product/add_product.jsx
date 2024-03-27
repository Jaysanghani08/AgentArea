import React, { useState } from 'react'
import { addProduct, isLogged } from '../../services/Api';
import Spinner from '../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from './../../components/misc/form';

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        type: '',
        company_id: '',
        product_name: '',
        product_type: '',
        agency_id: ''
    });

    if(!isLogged('admin')){
        alert('You are not logged in. Please login to continue')
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setIsLoading(true);

        try {
            const response = await addProduct(formData);

            if(response.status === 200) {
                alert('Agency created successfully');
            }
            else{
                alert('Error creating agency')
            }
        } catch (error) {
            console.log(error);
            alert('Error creating agency')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <TextContent>
                <Heading>Create new <span className="text-primary-500">Product</span></Heading>

                <Form onSubmit={handleSubmit}>
                    <Subheading>Product Information</Subheading>
                    <FormGroup>
                        <Label htmlFor="company">Company Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="company_id" onChange={handleChange}>
                            <option value="">Select Company</option>
                            <option value="659c68ab20de061edfa15294">Company 1</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="agency">Agency Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="agency_id" onChange={handleChange}>
                            <option value="">Select Agency</option>
                            <option value="659c68ab20de061edfa15294">Agency 1</option>
                        </Select>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="type">Insurance Type <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="type" onChange={handleChange}>
                            <option value="">Select Type</option>
                            <option value="health">Health</option>
                            <option value="motor">Motor</option>
                            <option value="sme">SME</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="product_type">Product Type <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="product_type" onChange={handleChange}>
                            {formData.type === 'health' && (
                                <>
                                    <option value="">Select Product Type</option>
                                    <option value="individual">Individiual</option>
                                    <option value="familyFloater">Family Floater</option>
                                    <option value="personalAccident">Personal Accident</option>
                                    <option value="travel">Travel</option>
                                </>
                            )}
                            {formData.type === 'motor' && (
                                <>
                                    <option value="">Select Product Type</option>
                                    <option value="privateCar">Private Car</option>
                                    <option value="twoWheeler">Two Wheeler</option>
                                    <option value="commercialVehicle">Commercial Vehicle</option>
                                    <option value="miscellaneous">Miscellaneous</option>
                                </>
                            )}  
                            {formData.type === 'sme' && (
                                <>
                                    <option value="">Select Product Type</option>
                                    <option value="fire">Fire</option>
                                    <option value="marine">Marine</option>
                                    <option value="workmenCompensation">Workmen Compensation</option>
                                    <option value="other">Other</option>
                                </>
                            )}
                            {formData.type !== 'health' && formData.type !== 'motor' && formData.type !== 'sme' && (
                                <>
                                    <option value="">Select Insurance Type</option>
                                </>
                            )}  
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="name">Product Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Input type="text" name="product_name" placeholder="Product Name" onChange={handleChange} />
                    </FormGroup>

                    <SubmitButton>{isLoading ? <Spinner height={20} color='#000000' /> : 'Create Product'}</SubmitButton>
                </Form>
            </TextContent>
        </Container>
    )
};

export default AddProduct;