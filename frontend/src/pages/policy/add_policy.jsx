import React, { useEffect, useState } from 'react'
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "./../../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "./../../components/misc/Buttons.js";
import Spinner from './../../components/general/spinner';
import { CheckIfGroupCodeExists, addCustomer, getCompanies, addPolicy } from './../../services/Api';

const Container = tw.div`relative flex items-center justify-center p-12`;
const TextContent = tw.div`mx-auto w-full max-w-[950px] bg-white`;

const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;
const Form = tw.form`mt-5`
const FormGroup = tw.div`mb-5 grid grid-cols-1 md:grid-cols-5 gap-x-5 md:gap-x-0 md:gap-y-6`
const Label = tw.label`mb-1 flex items-center  text-base font-medium text-[#07074D] col-span-1`
const RequiredIndicator = tw.span`text-red-500`
const Input = tw.input`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-4`
const Select = tw.select`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-4`
const HalfInput = tw.input`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-1`
const HalfSelect = tw.select`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-1`
const ErrorMsg = tw.p`text-red-500 col-span-4`
const Gap = tw.div`col-span-1`
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}`

const SubmitButton = tw(PrimaryButtonBase)`flex justify-center items-center inline-block mt-8`

const agents = [
    {
        id: '658bed167dd0bb526193617e',
        name: 'Agent 1'
    },
    {
        id: 2,
        name: 'Agent 2'
    },
    {
        id: 3,
        name: 'Agent 3'
    }
]

const paymentType = [
    {
        id: "cash",
        name: 'Cash'
    },
    {
        id: "cheque",
        name: 'Cheque'
    },
    {
        id: "net_banking",
        name: 'NET Banking'
    },
    {
        id: "credit_card",
        name: 'Credit Card'
    },
    {
        id: "debit_card",
        name: 'Debit Card'
    }
]

const bussinessType = [
    {
        id: 1,
        name: 'Fresh'
    },
    {
        id: 2,
        name: 'Renewal'
    },
    {
        id: 3,
        name: 'Port'
    }
]

const AddPolicy = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [groupMembers, setGroupMembers] = useState(null);
    const [fetchedButNotExists, setFetchedButNotExists] = useState(false);
    const [companylist, setCompanyList] = useState(null);
    const [agencies, setAgencies] = useState(null);
    const [products, setProducts] = useState(null);


    const [formData, setFormData] = useState({
        policy_number: '',
        customer_id: '',
        groud_id: '',
        group_code: '',
        policy_type: '',
        company_id: '',
        product_id: '',
        agency: '',
        business_type: '',
        login_date: '',
        start_date: '',
        end_date: '',
        basic_premium: '',
        commissionable_premium: '',
        sum_assured: '',
        gst: '',
        total_premium_amount: '',
        payment_type: '',
        quick_pay_id: '',
        premium_deposite_date: '',
        remark: '',
        chequeDate: '',
        chequeNumber: '',
        payment_bank_branch: '',
        idv: '',
        tp_premium: '',
        od_premium: '',
        registration_number: '',
        renewal_notice_copy: null,
        policy_copy: null,
    });

    const [customerFormData, setCustomerFormData] = useState({
        agent_id: '',
        name: '',
        mobile: '',
        email: '',
        dob: '',
    });

    const handleCustomerChange = (e) => {
        setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value });
    }

    const [renewalNoticeCopy, setRenewalNoticeCopy] = useState(null);
    const [policyCopy, setPolicyCopy] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'company_id') {
            const company = companylist.find((company) => company._id === e.target.value);
            setAgencies(company?.agencies);
            setProducts(company?.products);
        }

    }

    console.log(companylist)
    console.log(formData)

    useEffect(() => {
        const fetchCompanyList = async () => {
            try {
                const response = await getCompanies();
                if (response.status === 200) {
                    setCompanyList(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyList();
    }, [])

    const handleRenewalNoticeCopyChange = (e) => {
        setRenewalNoticeCopy(e.target.files[0]);
    }

    const handlePolicyCopyChange = (e) => {
        setPolicyCopy(e.target.files[0]);
    }

    const handleGroupIdChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.value.length != 10) {
            setFetchedButNotExists(false);
            setGroupMembers({});
        }

        if (e.target.value.length === 10 && !isNaN(e.target.value)) {
            await IfGroupExists(e.target.value);
        }
    }

    const IfGroupExists = async (groupCode) => {
        try {
            const response = await CheckIfGroupCodeExists(groupCode);
            console.log(response);
            if (response.status === 200) {
                alert('Group exists')
                setFormData({ ...formData, group_code: response.data?._id });
                setFetchedButNotExists(false);
                setGroupMembers(response.data?.members);
            } else if (response.status === 201) {
                setFetchedButNotExists(true);
                setGroupMembers({});
            } else {
                setGroupMembers({});
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAddCustomer = async (e) => {
        e.preventDefault();

        const data = {
            group_id: formData.group_code,
            ...customerFormData
        }

        console.log(data);

        try {
            const response = await addCustomer(data);
            if (response.status === 200) {
                alert('Customer created successfully');
            } else {
                alert('Something went wrong');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // formData.groud_id = group_id;
        renewalNoticeCopy && (formData.renewal_notice_copy = renewalNoticeCopy);
        formData.policy_copy = policyCopy;

        console.log(formData);

        try {
            const response = await addPolicy(formData);

            if (response.status === 200) {
                alert('Policy addedd successfully');
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // check if group code is mobile number
    // if(formData.group_code && formData.group_code.length === 10 && !isNaN(formData.group_code)) {
    //     IfGroupExists();
    // }


    // const subheading = "Purchase New Policy";
    const heading = <> Purchase New <span className="text-primary-500">Policy</span></>;
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const submitButtonText = isLoading ? <Spinner height={20} color='#000000' /> : 'Sign in';

    return (
        <>
            <Container>
                <TextContent>
                    <Heading>{heading}</Heading>
                    {/* <Container> <Spinner height={60} color='#000000' /> </Container> */}
                    <Form  >

                        <Subheading>Customer Details</Subheading>

                        {/* group id */}
                        <FormGroup>
                            <Label htmlFor="group_code">Group Code <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="text" name="group_code" placeholder="Group Code" onChange={handleGroupIdChange} />
                        </FormGroup>

                        {
                            fetchedButNotExists && <ErrorMsg>Group does not exists. Will be created automatically.</ErrorMsg>
                        }
                        {
                            groupMembers?.length &&
                            <>
                                <Subheading>Select Member</Subheading>
                                <FormGroup>
                                    <Label htmlFor="customer_id">Customer  <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="customer_id" onChange={handleChange}>
                                        <option value="">Select Customer</option>
                                        {
                                            groupMembers.map((member) => (
                                                <option key={member._id} value={member._id}>{member.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>
                            </>
                        }

                        {groupMembers?.length && !formData.customer_id && <Subheading>Or</Subheading>}

                        {
                            (fetchedButNotExists || (groupMembers?.length && !formData.customer_id)) &&
                            <>
                                <Subheading>Add New</Subheading>

                                {/* agent select */}
                                < FormGroup >
                                    <Label htmlFor="agent_id">Agent Id <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Select name="agent_id" onChange={handleCustomerChange}>
                                        <option value="">Select Agent</option>
                                        {
                                            agents.map((agent) => (
                                                <option key={agent.id} value={agent.id}>{agent.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>

                                {/* name */}
                                <FormGroup>
                                    <Label htmlFor="name">Proposal Name <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Input type="text" name="name" placeholder="Proposal Name" onChange={handleCustomerChange} />
                                </FormGroup>

                                {/* mobile */}
                                <FormGroup>
                                    <Label htmlFor="mobile">Mobile <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="text" name="mobile" placeholder="Mobile" onChange={handleCustomerChange} />
                                </FormGroup>

                                {/* dob */}
                                <FormGroup>
                                    <Label htmlFor="dob">DOB<RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="date" name="dob" placeholder="DOB" onChange={handleCustomerChange} />
                                </FormGroup>

                                {/* email */}
                                <FormGroup>
                                    <Label htmlFor="email">Email<RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="text" name="email" placeholder="Email" onChange={handleCustomerChange} />
                                </FormGroup>

                                <SubmitButton onClick={handleAddCustomer}>Add Customer</SubmitButton>
                            </>
                        }


                        <HoriZontalLine />

                        {/* Policy number */}
                        <FormGroup>
                            <Label htmlFor="policy_number">Policy Number <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" name="policy_number" placeholder="Policy Number" onChange={handleChange} />
                        </FormGroup>

                        {/* company select */}
                        {
                            companylist &&
                            <>
                                <FormGroup>
                                    <Label htmlFor="company_id">Company <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="company_id" onChange={handleChange}>
                                        <option value="">Select Company</option>
                                        {
                                            companylist?.map((company) => (
                                                <option key={company._id} value={company._id}>{company.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>


                                {/* Agency select */}
                                <FormGroup>
                                    <Label htmlFor="agency">Agency <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="agency" onChange={handleChange}>
                                        <option value="">Select Agency</option>
                                        {/* selected company.agencies */}
                                        {
                                            agencies?.map((agency) => (
                                                <option key={agency._id} value={agency._id}>{agency.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>



                                {/*  product selcet */}
                                <FormGroup>
                                    <Label htmlFor="product_id">Product <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="product_id" onChange={handleChange}>
                                        <option value="">Select Product</option>
                                        {
                                            products?.map((product) => (
                                                <option key={product._id} value={product._id}>{product.product_name}</option>
                                            ))    
                                        }
                                    </Select>
                                </FormGroup>
                            </>
                        }


                        <FormGroup>
                            <Label htmlFor="policy_type">Policy Type <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Select name="policy_type" onChange={handleChange}>
                                <option value="">Select Policy Type</option>
                                <option value="1">Policy Type 1</option>
                                <option value="2">Policy Type 2</option>
                                <option value="3">Policy Type 3</option>
                            </Select>
                        </FormGroup>
                        {/* bussiness type */}
                        <FormGroup>
                            <Label htmlFor="business_type">Business Type <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Select name="business_type" onChange={handleChange}>
                                <option value="">Select Business Type</option>
                                {
                                    bussinessType.map((type) => (
                                        <option key={type.id} value={type.name}>{type.name}</option>
                                    ))
                                }
                            </Select>
                        </FormGroup>

                        {/* login date */}
                        <FormGroup>
                            <Label htmlFor="login_date">Login Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="date" name="login_date" placeholder="Login Date" onChange={handleChange} />
                        </FormGroup>

                        {/* start date */}
                        {/* end date */}
                        <FormGroup>
                            <Label htmlFor="start_date">Start Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="start_date" placeholder="Start Date" onChange={handleChange} />
                            <Gap />
                            <Label htmlFor="end_date">End Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="end_date" placeholder="End Date" onChange={handleChange} />
                        </FormGroup>

                        {/* basic premium */}
                        {/* commissionable premium */}
                        <FormGroup>
                            <Label htmlFor="basic_premium">Basic Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="basic_premium" placeholder="Basic Premium" onChange={handleChange} />
                            <Gap />
                            <Label htmlFor="commissionable_premium">Commissionable Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="commissionable_premium" placeholder="Commissionable Premium" onChange={handleChange} />
                        </FormGroup>


                        {
                            formData.policy_type === 'motor' ?
                                <>
                                    {/* idv */}
                                    {/* tp premium */}
                                    <FormGroup>
                                        <Label htmlFor="idv">IDV <RequiredIndicator>*</RequiredIndicator> </Label>
                                        <HalfInput type="text" name="idv" placeholder="IDV" onChange={handleChange} />
                                        <Gap />
                                        <Label htmlFor="tp_premium">TP Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                                        <HalfInput type="text" name="tp_premium" placeholder="TP Premium" onChange={handleChange} />
                                    </FormGroup>

                                    {/* od premium */}
                                    {/* registration number */}
                                    <FormGroup>
                                        <Label htmlFor="od_premium">OD Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                                        <HalfInput type="text" name="od_premium" placeholder="OD Premium" onChange={handleChange} />
                                        <Gap />
                                        <Label htmlFor="registration_number">Registration Number <RequiredIndicator>*</RequiredIndicator> </Label>
                                        <HalfInput type="text" name="registration_number" placeholder="Registration Number" onChange={handleChange} />
                                    </FormGroup>
                                </>
                                :
                                <>
                                    {/* sum assured */}
                                    <FormGroup>
                                        <Label htmlFor="sum_assured">Total Sum Assured <RequiredIndicator>*</RequiredIndicator> </Label>
                                        <Input type="text" name="sum_assured" placeholder="Sum Assured" onChange={handleChange} />
                                    </FormGroup>
                                </>
                        }

                        {/* gst */}
                        {/* total premium amount */}
                        <FormGroup>
                            <Label htmlFor="gst">GST <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="gst" placeholder="GST" onChange={handleChange} />
                            <Gap />
                            <Label htmlFor="total_premium_amount">Total Premium Amount <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="total_premium_amount" placeholder="Total Premium Amount" onChange={handleChange} />
                        </FormGroup>

                        <HoriZontalLine />
                        {/* payment type */}
                        <FormGroup>
                            <Label htmlFor="payment_type">Payment Type <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfSelect name="payment_type" onChange={handleChange}>
                                <option value="">Select Payment Type</option>
                                {
                                    paymentType.map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))
                                }
                            </HalfSelect>
                            <Gap />
                            <Label htmlFor="premium_deposite_date">Premium Deposite Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="premium_deposite_date" placeholder="Premium Deposite Date" onChange={handleChange} />
                        </FormGroup>

                        {/* quick pay id */}
                        {
                            (formData.payment_type === 'net_banking' || formData.payment_type === 'credit_card' || formData.payment_type === 'debit_card') &&
                            <FormGroup>
                                <Label htmlFor="quick_pay_id">Quick Pay ID <RequiredIndicator>*</RequiredIndicator> </Label>
                                <Input type="text" name="quick_pay_id" placeholder="Quick Pay ID" onChange={handleChange} />
                            </FormGroup>
                        }

                        {/* premium deposite date */}
                        {
                            formData.payment_type === 'cheque' &&
                            <>
                                <FormGroup>
                                </FormGroup>

                                {/* // cheque date */}
                                <FormGroup>
                                    <Label htmlFor="chequeDate">Cheque Date <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="date" name="chequeDate" placeholder="Cheque Date" onChange={handleChange} />
                                </FormGroup>

                                {/* // cheque number */}
                                <FormGroup>
                                    <Label htmlFor="chequeNumber">Cheque Number <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="text" name="chequeNumber" placeholder="Cheque Number" onChange={handleChange} />
                                </FormGroup>

                                {/* // payment bank branch */}
                                <FormGroup>
                                    <Label htmlFor="payment_bank_branch">Payment Bank Branch <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="text" name="payment_bank_branch" placeholder="Payment Bank Branch" onChange={handleChange} />
                                </FormGroup>
                            </>

                        }



                        {/* remark */}
                        <FormGroup>
                            <Label htmlFor="remark">Remark <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Textarea name="remark" placeholder="Remark" onChange={handleChange} />
                        </FormGroup>

                        <HoriZontalLine />
                        {/* renewal notice copy */}
                        <FormGroup>
                            <Label htmlFor="renewal_notice_copy">Renewal Notice Copy </Label>
                            <Input type="file" name="renewal_notice_copy" placeholder="Renewal Notice Copy" onChange={handleRenewalNoticeCopyChange} accept=".pdf" />
                        </FormGroup>

                        {/* policy copy */}
                        <FormGroup>
                            <Label htmlFor="policy_copy">Policy Copy <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="file" name="policy_copy" placeholder="Policy Copy" onChange={handlePolicyCopyChange} accept=".jpg, .jpeg, .png, .pdf" />
                        </FormGroup>

                        {/* <FileLabel > Aadhar </FileLabel> */}
                        {/* <FileInput type="file" name="aadharFile" placeholder="Aadhar Card" onChange={handleAadharFileChange} accept=".jpg, .jpeg, .png, .pdf" /> */}
                        {/* <FileLabel > PAN </FileLabel> */}
                        {/* <FileInput type="file" name="panDoc" placeholder="PAN Card" onChange={handlePanFileChange} accept=".jpg, .jpeg, .png, .pdf" /> */}
                        <SubmitButton className="btn btn-primary flex justify-center items-center" onClick={handleSubmit}>{submitButtonText}</SubmitButton>
                    </Form>
                </TextContent>
            </Container >
        </>
    )
};

export default AddPolicy;