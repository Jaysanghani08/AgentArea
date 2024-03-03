import React, { useEffect, useState } from 'react'
import Spinner from './../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from '../../components/misc/form.js';
import { CheckIfGroupCodeExists, addCustomer, getCompanies, addPolicy, getAgents, getPolicy } from './../../services/Api';
import getTodayDate from './../../helpers/TodayDate.js';
import Validate from '../../helpers/Validator.js';
import { useLocation } from 'react-router-dom';

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

const PolicyDetail = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [policydata, setPolicyData] = useState({});
    const policyId = useLocation().pathname.split("/").pop();

    useEffect(() => {
        const fetchCompanyList = async () => {
            try {
                const [policyResponse] = await Promise.all(
                    [
                        getPolicy(policyId)
                    ]
                );
                console.log(policyResponse.data)
                if (policyResponse.status === 200) {
                    setPolicyData(policyResponse.data);
                } else {
                    alert('Something went wrong. Try after some time.');
                }
                // console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyList();
    }, [])


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
                            <Input type="text" name="group_code" placeholder="Group Code" />
                        </FormGroup>

                        <HoriZontalLine />
                        <Subheading>Policy Details</Subheading>
                        {/* Policy number */}
                        <FormGroup>
                            <Label htmlFor="policy_number">Policy Number <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" name="policy_number" placeholder="Policy Number" />
                        </FormGroup>

                        {/* bussiness type */}
                        <FormGroup>
                            <Label htmlFor="business_type">Business Type <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Select name="business_type">
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
                            <Input type="date" name="login_date" placeholder="Login Date" />
                        </FormGroup>

                        {/* start date */}
                        {/* end date */}
                        <FormGroup>
                            <Label htmlFor="start_date">Start Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="start_date" placeholder="Start Date" />
                            <Gap />
                            <Label htmlFor="end_date">End Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="end_date" placeholder="End Date" />
                        </FormGroup>

                        {/* basic premium */}
                        {/* commissionable premium */}
                        <FormGroup>
                            <Label htmlFor="basic_premium">Basic Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="basic_premium" placeholder="Basic Premium" />
                            <Gap />
                            <Label htmlFor="commissionable_premium">Commissionable Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="commissionable_premium" placeholder="Commissionable Premium" />
                        </FormGroup>



                        <FormGroup>
                            <Label htmlFor="idv">IDV <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="idv" placeholder="IDV" />
                            <Gap />
                            <Label htmlFor="tp_premium">TP Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="tp_premium" placeholder="TP Premium" />
                        </FormGroup>

                        {/* od premium */}
                        {/* registration number */}
                        <FormGroup>
                            <Label htmlFor="od_premium">OD Premium <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="od_premium" placeholder="OD Premium" />
                            <Gap />
                            <Label htmlFor="registration_number">Registration Number <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="registration_number" placeholder="Registration Number" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="sum_assured">Total Sum Assured <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="text" name="sum_assured" placeholder="Sum Assured" />
                        </FormGroup>



                        <FormGroup>
                            <Label htmlFor="gst">GST <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="gst" placeholder="GST" />
                            <Gap />
                            <Label htmlFor="total_premium_amount">Total Premium Amount <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="text" name="total_premium_amount" placeholder="Total Premium Amount" />
                        </FormGroup>

                        <HoriZontalLine />
                        <Subheading>Payment Details</Subheading>
                        <FormGroup>
                            <Label htmlFor="payment_type">Payment Type <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfSelect name="payment_type">
                                <option value="">Select Payment Type</option>
                                {
                                    paymentType.map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))
                                }
                            </HalfSelect>
                            <Gap />
                            <Label htmlFor="premium_deposite_date">Premium Deposite Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <HalfInput type="date" name="premium_deposite_date" placeholder="Premium Deposite Date" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="quick_pay_id">Quick Pay ID </Label>
                            <Input type="text" name="quick_pay_id" placeholder="Quick Pay ID" />
                        </FormGroup>

                        {/* premium deposite date */}
                        <FormGroup>
                            <Label htmlFor="chequeDate">Cheque Date <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="date" name="chequeDate" placeholder="Cheque Date" />
                        </FormGroup>

                        {/* // cheque number */}
                        <FormGroup>
                            <Label htmlFor="chequeNumber">Cheque Number <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="text" name="chequeNumber" placeholder="Cheque Number" />
                        </FormGroup>

                        {/* // payment bank branch */}
                        <FormGroup>
                            <Label htmlFor="payment_bank_branch">Payment Bank Branch <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="text" name="payment_bank_branch" placeholder="Payment Bank Branch" />
                        </FormGroup>

                        {/* remark */}
                        <FormGroup>
                            <Label htmlFor="remark">Remark</Label>
                            <Textarea name="remark" placeholder="Remark" />
                        </FormGroup>

                        {/* <HoriZontalLine />
                        <Subheading>Upload Documents</Subheading> */}

                        {/* renewal notice copy */}
                        {/* <FormGroup>
                            <Label htmlFor="renewal_notice_copy">Renewal Notice Copy </Label>
                            <Input type="file" name="renewal_notice_copy" placeholder="Renewal Notice Copy" onChange={handleRenewalNoticeCopyChange} accept=".pdf" />
                        </FormGroup>

                        {/* policy copy */}
                        {/* <FormGroup>
                            <Label htmlFor="policy_copy">Policy Copy <RequiredIndicator>*</RequiredIndicator> </Label>
                            <Input type="file" name="policy_copy" placeholder="Policy Copy" onChange={handlePolicyCopyChange} accept=".jpg, .jpeg, .png, .pdf" />
                        </FormGroup>  */}

                        {/* <FileLabel > Aadhar </FileLabel> */}
                        {/* <FileInput type="file" name="aadharFile" placeholder="Aadhar Card" onChange={handleAadharFileChange} accept=".jpg, .jpeg, .png, .pdf" /> */}
                        {/* <FileLabel > PAN </FileLabel> */}
                        {/* <FileInput type="file" name="panDoc" placeholder="PAN Card" onChange={handlePanFileChange} accept=".jpg, .jpeg, .png, .pdf" /> */}
                        {/* <SubmitButton className="btn btn-primary flex justify-center items-center" onClick={handleSubmit}>{submitButtonText}</SubmitButton> */}
                    </Form>
                </TextContent>
            </Container >
        </>
    )
};

export default PolicyDetail;