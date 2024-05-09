import React, { useEffect, useState } from 'react'
import Spinner from './../../components/general/spinner';
import { Container, TextContent, Subheading, Heading, HoriZontalLine, Form, FormGroup, Label, RequiredIndicator, Input, Select, HalfInput, HalfSelect, ErrorMsg, Gap, Textarea, SubmitButton } from '../../components/misc/form.js';
import { CheckIfGroupCodeExists, addCustomer, getCompanies, addPolicy, getAgents, getPolicy, getAgentPolicy } from './../../services/Api';
import getTodayDate from './../../helpers/TodayDate.js';
import Validate from '../../helpers/Validator.js';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

// const policydata =  {
//     "_id": "65a909cf5079e4869851b75b",
//     "agent_id": "658bed167dd0bb526193617e",
//     "customer_id": "65a8f2f2e689bf0669e8d783",
//     "policy_number": "H123456789",
//     "group_code": "65980c2141052132456e194a",
//     "policy_type": "health",
//     "company_id": "659c68ab20de061edfa15294",
//     "product_id": "659c69d52398e0bddef78497",
//     "agency": "659c692120de061edfa152a6",
//     "business_type": "individual",
//     "login_date": "2020-04-11T00:00:00.000Z",
//     "start_date": "2023-04-01T00:00:00.000Z",
//     "end_date": "2023-05-12T00:00:00.000Z",
//     "basic_premium": 5000,
//     "commissionable_premium": 4500,
//     "gst": 900,
//     "total_premium_amount": 5400,
//     "payment_type": "cheque",
//     "cheque_details": {
//         "chequeNumber": "CHQ123456",
//         "chequeDate": "2020-12-02T00:00:00.000Z",
//         "payment_bank_branch": "ABC Bank, XYZ Branch",
//         "_id": "65a909cf5079e4869851b75c"
//     },
//     "premium_deposite_date": "2022-02-02T00:00:00.000Z",
//     "sum_assured": 100900,
//     "remark": "Payment received",
//     "__v": 0,
//     "group": {
//         "_id": "65980c2141052132456e194a",
//         "id": 9157212522,
//         "members": {
//             "agent_id": "658bed167dd0bb526193617e",
//             "name": "John Doe",
//             "mobile": 9191211123,
//             "email": "john.doe@example.com",
//             "dob": "1990-01-01T00:00:00.000Z",
//             "_id": "65a8f2f2e689bf0669e8d783"
//         },
//         "__v": 0
//     },
//     "agent": {
//         "_id": "658bed167dd0bb526193617e",
//         "name": "Shubham",
//         "mobile": "7622051688",
//         "email": "shubhampatel13495@gmail.com"
//     },
//     "company": {
//         "_id": "659c68ab20de061edfa15294",
//         "name": "HDFC",
//         "url": "www.hdfc.com",
//         "agencies": {
//             "name": "jainil",
//             "code": 121212,
//             "_id": "659c692120de061edfa152a6"
//         },
//         "products": {
//             "product_name": "HDFC LIFE",
//             "product_type": "Individual",
//             "company_agency": "658e63cdc91ffab61946cd2a",
//             "policy_type": "health",
//             "_id": "659c69d52398e0bddef78497"
//         },
//         "__v": 0
//     }
// }

const PolicyDetail = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [policydata, setPolicyData] = useState({});
    const policyId = useLocation().pathname.split("/").pop();
    const usr = JSON.parse(Cookies.get('user') || null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                console.log(usr?.type)
                if (usr?.type === "admin") {
                    const [policyResponse] = await Promise.all(
                        [
                            getPolicy(policyId)
                        ]
                    );

                    console.log(policyResponse?.data[0])

                    if (policyResponse.status === 200) {
                        setPolicyData(policyResponse?.data[0]);
                    } else {
                        alert('Something went wrong. Try after some time.');
                        navigate('/admin/policylist')
                    }
                    // console.log(response.data)
                }
                else if (usr?.type === "agent") {
                    const [policyResponse] = await Promise.all(
                        [
                            getAgentPolicy(policyId)
                        ]
                    );

                    console.log(policyResponse?.data[0])

                    if (policyResponse.status === 200) {
                        setPolicyData(policyResponse?.data[0]);
                    } else {
                        alert('Something went wrong. Try after some time 1smmsdas.');
                        // navigate('/agent/policylist')
                    }
                }
                else {
                    alert('You are not authorized to view this page');
                    navigate('/home');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPolicy();
    }, [])


    const heading = <> Polict Details </>;
    const submitButtonText = isLoading ? <Spinner height={20} color='#000000' /> : 'Create Policy';

    return (
        <>
            <Container>
                <TextContent>
                    <Heading>{heading}</Heading>
                    {/* <Container> <Spinner height={60} color='#000000' /> </Container> */}
                    <Form>

                        <Subheading>Customer Details</Subheading>

                        <FormGroup>
                            <Label>Customer Name <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.group?.members?.name} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>Mobile Number <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.group?.members?.mobile} disabled />
                        </FormGroup>

                        <HoriZontalLine />
                        <Subheading>Policy Details</Subheading>

                        <FormGroup>
                            <Label>Policy Number <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.policy_number} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>Group Code <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.group_code} disabled />
                        </FormGroup>


                        <FormGroup>
                            <Label>Policy Type <RequiredIndicator>*</RequiredIndicator></Label>
                            <Select>
                                <option value={policydata?.policy_type}>{policydata?.policy_type}</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Company <RequiredIndicator>*</RequiredIndicator></Label>
                            <Select>
                                <option value={policydata?.company?.name}>{policydata?.company?.name}</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Product <RequiredIndicator>*</RequiredIndicator></Label>
                            <Select>
                                <option value={policydata?.company?.products?.product_name}>{policydata?.company?.products?.product_name}</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Agency <RequiredIndicator>*</RequiredIndicator></Label>
                            <Select>
                                <option value={policydata?.company?.agencies?.name}>{policydata?.company?.agencies?.name}</option>
                            </Select>

                        </FormGroup>

                        <FormGroup>
                            <Label>Business Type <RequiredIndicator>*</RequiredIndicator></Label>
                            <Select>
                                <option value={policydata?.business_type}>{policydata?.business_type}</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Start Date <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.start_date} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>End Date <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.end_date} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>Basic Premium <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.basic_premium} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>Commissionable Premium <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.commissionable_premium} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>GST <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.gst} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label>Total Premium Amount <RequiredIndicator>*</RequiredIndicator></Label>
                            <Input type="text" value={policydata?.total_premium_amount} disabled />
                        </FormGroup>

                        {
                            policydata?.policy_type === 'motor' ?
                                <>

                                    <FormGroup>
                                        <Label>Idv</Label>
                                        <Input type="text" value={policydata?.idv} disabled />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>TP Premium</Label>
                                        <Input type="text" value={policydata?.tp_premium} disabled />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>OD Premium</Label>
                                        <Input type="text" value={policydata?.od_premium} disabled />
                                    </FormGroup>

                                    {/* registration_number */}
                                    <FormGroup>
                                        <Label>Registration Number</Label>
                                        <Input type="text" value={policydata?.registration_number} disabled />
                                    </FormGroup>
                                </>
                                :
                                <FormGroup>
                                    <Label>Sum Assured <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Input type="text" value={policydata?.sum_assured} disabled />
                                </FormGroup>
                        }


                        <HoriZontalLine />
                        <Subheading>Payment Details</Subheading>

                        <FormGroup>
                            <Label>Payment Type <RequiredIndicator>*</RequiredIndicator></Label>
                            <Select>
                                <option value={policydata?.payment_type}>{policydata?.payment_type}</option>
                            </Select>
                        </FormGroup>

                        {
                            policydata?.payment_type === 'cheque' &&
                            <>
                                <FormGroup>
                                    <Label>Cheque Number <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Input type="text" value={policydata?.cheque_details?.chequeNumber} disabled />
                                </FormGroup>


                                <FormGroup>
                                    <Label>Cheque Date <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Input type="text" value={policydata?.cheque_details?.chequeDate} disabled />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Payment Bank Branch <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Input type="text" value={policydata?.cheque_details?.payment_bank_branch} disabled />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Premium Deposite Date <RequiredIndicator>*</RequiredIndicator></Label>
                                    <Input type="text" value={policydata?.premium_deposite_date} disabled />
                                </FormGroup>
                            </>
                        }

                        {
                            (policydata?.payment_type === 'net_banking' || policydata?.payment_type === 'credit_card' || policydata?.payment_type === 'debit_card') &&
                            <FormGroup>
                                <Label>Quick Pay Id <RequiredIndicator>*</RequiredIndicator></Label>
                                <Input type="text" value={policydata?.quick_pay_id} disabled />
                            </FormGroup>
                        }



                        <FormGroup>
                            <Label>Remark <RequiredIndicator>*</RequiredIndicator></Label>
                            <Textarea value={policydata?.remark} disabled />
                        </FormGroup>

                    </Form>


                </TextContent>
            </Container >
        </>
    )
};

export default PolicyDetail;