import React, { useState, useEffect } from 'react'
import { getCompanies, getAgencies, addProduct, isLogged } from '../../services/Api';
import Spinner from '../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from './../../components/misc/form';

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const [isCompanySelected, setIsCompanySelected] = useState(false);
    const [agencyList, setAgencyList] = useState([]);
    const [fetchedButNotExists, setFetchedButNotExists] = useState(false);

    const [formData, setFormData] = useState({
        policy_type: '',
        company_id: '',
        product_name: '',
        product_type: '',
        agency_id: ''
    });

    useEffect(() => {
        const fetchCompanyList = async () => {
            try {
                const [companyResopnse, agentResponse] = await Promise.all(
                    [
                        getCompanies(),
                    ]
                );
                // console.log(agentResponse.data)
                if (companyResopnse.status === 200) {
                    setCompanyList(companyResopnse.data);
                }else{
                    alert('Something went wrong. Try after some time.');
                }
                // console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyList();
    }, [])

    useEffect(() => {
        const fetchAgencyList = async () => {
            try {
                const response = await getAgencies(formData.company_id);
                // console.log(response.data)
                if (response.status === 200) {
                    setAgencyList(response.data);
                }else{
                    setFetchedButNotExists(true);
                }
                // console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        if(formData.company_id){
            fetchAgencyList();
        }
    }, [formData.company_id])

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
                alert('Product created successfully');
            }
            else{
                alert('Error creating product')
            }
        } catch (error) {
            console.log(error);
            alert('Error creating product')
        } finally {
            setIsLoading(false);
        }
    }
    console.log(agencyList);
    console.log(formData);

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
                            {companyList.map((company, index) => (
                                <option key={index} value={company._id}>{company.name}</option>
                            ))}
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="agency">Agency Name <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="agency_id" onChange={handleChange}>
                            <option value="">Select Agency</option>
                            {agencyList.map((agency, index) => (
                                <option key={index} value={agency._id}>{agency.name}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="policy_type">Insurance Type <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="policy_type" onChange={handleChange}>
                            <option value="">Select Type</option>
                            <option value="health">Health</option>
                            <option value="motor">Motor</option>
                            <option value="sme">SME</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="product_type">Product Type <RequiredIndicator>*</RequiredIndicator></Label>
                        <Select name="product_type" onChange={handleChange}>
                            {formData.policy_type === 'health' && (
                                <>
                                    <option value="">Select Product Type</option>
                                    <option value="individual">Individiual</option>
                                    <option value="familyFloater">Family Floater</option>
                                    <option value="personalAccident">Personal Accident</option>
                                    <option value="travel">Travel</option>
                                </>
                            )}
                            {formData.policy_type === 'motor' && (
                                <>
                                    <option value="">Select Product Type</option>
                                    <option value="privateCar">Private Car</option>
                                    <option value="twoWheeler">Two Wheeler</option>
                                    <option value="commercialVehicle">Commercial Vehicle</option>
                                    <option value="miscellaneous">Miscellaneous</option>
                                </>
                            )}  
                            {formData.policy_type === 'sme' && (
                                <>
                                    <option value="">Select Product Type</option>
                                    <option value="fire">Fire</option>
                                    <option value="marine">Marine</option>
                                    <option value="workmenCompensation">Workmen Compensation</option>
                                    <option value="other">Other</option>
                                </>
                            )}
                            {formData.policy_type !== 'health' && formData.policy_type !== 'motor' && formData.policy_type !== 'sme' && (
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