import React, { useEffect, useState } from 'react'
import Spinner from './../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from '../../components/misc/form.js';
import { CheckIfGroupCodeExists, addCustomer, getCompanies, addPolicy, getAgents } from './../../services/Api';
import getTodayDate from './../../helpers/TodayDate.js';
import Validate from '../../helpers/Validator.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
        name: 'Portability'
    }
]

const policyType = [
    {
        id: 1,
        name: 'Motor',
        value: 'motor',
        subTypes: [
            // Private car 
            // two wheelr
            // comarcial vehicle
            // misliance
            {
                id: 11,
                name: 'Private Car',
                value: 'private_car'
            },
            {
                id: 12,
                name: 'Two Wheeler',
                value: 'two_wheeler'
            },
            {
                id: 13,
                name: 'Commercial Vehicle',
                value: 'commercial_vehicle'
            },
            {
                id: 14,
                name: 'Miscellaneous',
                value: 'miscellaneous'
            }
        ]
    },
    {
        id: 2,
        name: 'Health',
        value: 'health',
        subTypes: [
            // individua, family floter, personal acciden, Travel
            {
                id: 21,
                name: 'Individual',
                value: 'individual'
            },
            {
                id: 22,
                name: 'Family Floater',
                value: 'family_floater'
            },
            {
                id: 23,
                name: 'Personal Accident',
                value: 'personal_accident'
            },
            {
                id: 24,
                name: 'Travel',
                value: 'travel'
            }
        ]
    },
    {
        id: 3,
        name: 'SME',
        value: 'sme',
        subTypes: [
            // fire ,marine , wc, other
            {
                id: 31,
                name: 'Fire',
                value: 'fire'
            },
            {
                id: 32,
                name: 'Marine',
                value: 'marine'
            },
            {
                id: 33,
                name: 'Workmen Compensation',
                value: 'workmen_compensation'
            },
            {
                id: 34,
                name: 'Other',
                value: 'other'
            }
        ]
    }
]

const AddPolicy = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [groupMembers, setGroupMembers] = useState(null);
    const [fetchedButNotExists, setFetchedButNotExists] = useState(false);
    const [companylist, setCompanyList] = useState(null);
    const [agencies, setAgencies] = useState(null);
    const [products, setProducts] = useState(null);
    const [agents, setAgents] = useState([]);
    const navigate = useNavigate();
    const usr = JSON.parse(Cookies.get('user') || 'null');

    const [formData, setFormData] = useState({
        policy_number: '',
        customer_id: '',
        group_code: '',
        policy_type: '',
        policy_sub_type: '',
        company_id: '',
        agent_id : usr?.agentData?._id,
        product_id: '',
        agency: '',
        business_type: '',
        login_date: getTodayDate(),
        start_date: getTodayDate(),
        end_date: '',
        basic_premium: '',
        commissionable_premium: '',
        sum_assured: '',
        gst: '',
        total_premium_amount: '',
        payment_type: '',
        quick_pay_id: '',
        premium_deposite_date: getTodayDate(),
        remark: '',
        chequeDate: getTodayDate(),
        chequeNumber: '',
        payment_bank_branch: '',
        idv: '',
        tp_premium: '',
        od_premium: '',
        registration_number: '',
        renewal_notice_copy: null,
        policy_copy: null,
    });

    const formmRegex = {
        policy_number: {
            required: true,
            regex : /^[a-zA-Z0-9]{1,10}$/
        },
        customer_id: {
            required: true,
        },
        groud_id: {
            required: true,
        },
        group_code: {
            required: true,
            regex :  /^[0-9]{10}$/
        },
        policy_type: {
            required: true,
        },
        policy_sub_type: {
            required: true,
        },
        company_id: {
            required: true,
        },
        product_id: {
            required: true,
        },
        agency: {
            required: true,
        },
        business_type: {
            required: true,
        },
        login_date: {
            required: true,
        },
        start_date: {
            required: true,
        },
        end_date: {
            required: true,
        },
        basic_premium: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        commissionable_premium: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        sum_assured: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        gst: {
            required: true,
            // '10%' regex
            regex : /^(100|[1-9]\d?)$/
        },
        total_premium_amount: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        payment_type: {
            required: true,
        },
        quick_pay_id: {
        },
        premium_deposite_date: {
            required: true,
        },
        remark: {
        },
        chequeDate: {
            required: true,
        },
        chequeNumber: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        payment_bank_branch: {
            required: true,
        },
        idv: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        tp_premium: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        od_premium: {
            required: true,
            regex : /^[0-9]{1,10}$/
        },
        registration_number: {
            required: true,
            regex : /^[a-zA-Z0-9]{1,10}$/
        },
        renewal_notice_copy: {
        },
        policy_copy: {
            required: true,
        },
    }

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
        if(e.target.name === 'gst' && formData.basic_premium){
            setFormData({...formData, gst : e.target.value , total_premium_amount: (parseInt(formData.basic_premium) + parseInt(formData.basic_premium) * parseInt(e.target.value)/100).toString()})
        }
    }

    // console.log(products)
    // console.log(companylist)
    // console.log(formData)

    useEffect(() => {
        const fetchCompanyList = async () => {
            try {
                const [companyResopnse, agentResponse] = await Promise.all(
                    [
                        getCompanies(),
                        getAgents()
                    ]
                );
                // console.log(agentResponse.data)
                if (companyResopnse.status === 200) {
                    setCompanyList(companyResopnse.data);
                    setAgents(agentResponse.data);
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
                setFormData({ ...formData, group_code: response.data._id});
                setFetchedButNotExists(false);
                setGroupMembers(response.data?.members);
            } else if (response.status === 201) {
                // alert('Group does not exists')
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

    // console.log(formData.group_code)

    const handleAddCustomer = async (e) => {
        e.preventDefault();

        const data = {
            group_id: formData.group_code,
            ...customerFormData
        }

        // console.log(data);

        try {
            const response = await addCustomer(data);
            // console.log(response);
            if (response.status === 200) {
                setFormData({ ...formData, customer_id: response.data.id });
                alert('Customer created successfully');
            } else {
                alert('Something went wrong');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // console.log(usr?.agentData?._id)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // formData.groud_id = group_id;
        // setFormData({ ...formData,  });
        renewalNoticeCopy && (formData.renewal_notice_copy = renewalNoticeCopy);
        formData.policy_copy = policyCopy;

        // console.log(formData);

        // const errors = await Validate(formData, formmRegex);
        const errors = {};
        // console.log("CHUTIYO\n")
        console.log(errors);

        // if (errors) {
        //     setIsLoading(false);
        //     // errors is an object with key as field name and value as error message
        //     // alert(errors?.policy_number)
        //     return;
        // }

        try {
            const response = await addPolicy(formData);

            if (response.status === 200) {
                alert('Policy addedd successfully');
                navigate('/agent');
            }
            else if(response.status === 410){
                alert('Policy number already exists');
            } 
            else if(response.status === 413){
                alert("Payload too large");
            }
            else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // console.log(formData);

    const heading = <> Purchase New <span className="text-primary-500">Policy</span></>;
    const submitButtonText = isLoading ? <Spinner height={20} color='#000000' /> : 'Create Policy';

    return (
        <>
            <Container>
                <TextContent>
                    <Heading>{heading}</Heading>
                    {/* <Container> <Spinner height={60} color='#000000' /> </Container> */}
                    <Form>

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
                                                <option key={agent._id} value={agent._id}>{agent.name}</option>
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
                        <Subheading>Policy Details</Subheading>
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



                                {/*  product select */}



                                {/* policy type */}
                                <FormGroup>
                                    <Label htmlFor="policy_type">Policy Type <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="policy_type" onChange={handleChange}>
                                        <option value="">Select Policy Type</option>
                                        {
                                            policyType.map((type) => (
                                                <option key={type.id} value={type.value}>{type.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>

                                {/* policy subtype */}

                                <FormGroup>
                                    <Label htmlFor="policy_sub_type">Policy Sub Type <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="policy_sub_type" onChange={handleChange}>
                                        <option value="">Select Policy Sub Type</option>
                                        {
                                            formData.policy_type &&
                                            policyType.find((type) => type.value === formData.policy_type).subTypes.map((type) => (
                                                <option key={type.id} value={type.value}>{type.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="product_id">Product <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Select name="product_id" onChange={handleChange}>
                                        <option value="">Select Product</option>
                                        {
                                            // product of selected company with policy_type == policy_type and product_type == policy_sub_type
                                            formData.policy_type && formData.policy_sub_type && products?.filter((product) => product?.policy_type?.toLowerCase() === formData?.policy_type?.toLowerCase() && product?.product_type?.toLowerCase() === formData?.policy_sub_type?.toLowerCase()).map((product) => (
                                                <option key={product._id} value={product._id}>{product.product_name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>

                            </>
                        }
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
                            <Input type="date" name="login_date" placeholder="Login Date" onChange={handleChange} value={formData.login_date || ''}/>
                        </FormGroup>

                        {/* start date */}
                        {/* end date */}
                        <FormGroup>
                            <Label htmlFor="start_date">Start Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="start_date" placeholder="Start Date" onChange={handleChange} value={formData.start_date || ''}/>
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
                            <Label htmlFor="gst">GST (%) <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="gst" placeholder="GST" onChange={handleChange} />
                            <Gap />
                            <Label htmlFor="total_premium_amount">Total Premium Amount <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="total_premium_amount" placeholder="Total Premium Amount" value={formData.total_premium_amount} disabled/>
                        </FormGroup>

                        <HoriZontalLine />
                        <Subheading>Payment Details</Subheading>
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
                            <HalfInput type="date" name="premium_deposite_date" placeholder="Premium Deposite Date" onChange={handleChange} value={formData.premium_deposite_date || ''}/>
                        </FormGroup>

                        {/* quick pay id */}
                        {
                            (formData.payment_type === 'net_banking' || formData.payment_type === 'credit_card' || formData.payment_type === 'debit_card') &&
                            <FormGroup>
                                <Label htmlFor="quick_pay_id">Quick Pay ID </Label>
                                <Input type="text" name="quick_pay_id" placeholder="Quick Pay ID" onChange={handleChange} />
                            </FormGroup>
                        }

                        {/* premium deposite date */}
                        {
                            formData.payment_type === 'cheque' &&
                            <>

                                {/* // cheque date */}
                                <FormGroup>
                                    <Label htmlFor="chequeDate">Cheque Date <RequiredIndicator>*</RequiredIndicator> </Label>
                                    <Input type="date" name="chequeDate" placeholder="Cheque Date" onChange={handleChange} value={formData.chequeDate || ''}/>
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
                            <Label htmlFor="remark">Remark</Label>
                            <Textarea name="remark" placeholder="Remark" onChange={handleChange} />
                        </FormGroup>

                        <HoriZontalLine />
                        <Subheading>Upload Documents</Subheading>

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