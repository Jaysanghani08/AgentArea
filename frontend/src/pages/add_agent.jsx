import React, { useState } from 'react'
import { AgentSignup } from '../services/Api';
import Spinner from './../components/general/spinner';
// name: data.name,
//             bacode: data.bacode,
//             mobile: data.mobile,
//             email: data.email,
//             username: data.username,
//             password: data.password,
//             address: data.address,
//             city: data.city,
//             state: data.state,
//             pin: data.pin,
//             pan: data.pan,
//             bank: data.bank,
//             bankAccType: data.bankAccType,
//             micr: data.micr,
//             accNumber: data.accNumber,
//             bankIFSC: data.bankIFSC,
//             docs :[
//                 {
//                     aadhar: req.file.aadhar,
//                 },
//                 {
//                     pan : req.file.pan,
//                 }
//             ]

// if (err.hasOwnProperty('email') == true && err.email == 1) {
//     res.status(410).send();
// }
// else if (err.hasOwnProperty('mobile') == true && err.mobile == 1) {
//     res.status(411).send();
// }
// else if (err.hasOwnProperty('username') == true && err.username == 1) {
//     res.status(412).send();
// }
// else {
//     res.status(413).send("Bad Request");
// }

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
        aadharFile: null,
        panDoc: null
    });

    const [aadharFile, setAadharFile] = useState(null);
    const [panFile, setPanFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAadharFileChange = (event) => {
        setAadharFile(event.target.files[0]);
    };

    const handlePanFileChange = (event) => {
        setPanFile(event.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        formData.aadharFile = aadharFile;
        formData.panFile = panFile;

        try {
            const response = await AgentSignup(formData);

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

    return (
        <div className=" flex justify-center items-center bg-light">
            <div className="border rounded-md px-3 bg-white shadow-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className='text-gray-800 text-3xl'>
                            <span className='text-primary'>Agent</span> Create
                        </h1>
                        {/* <h2 className="mt-0 leading-9 tracking-tight text-gray-500">
                        Sign in to your account
                    </h2> */}
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" encType='multipart/form-data' onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-600">
                                    Mobile No.
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="tel"
                                        name="mobile"
                                        type="tel"
                                        pattern='(\+[1-9][0-9]{0,2})?[6-9]\d{9}'
                                        autoComplete="tel"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-600">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-600">
                                    UserName
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-600">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="address"
                                        name="address"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-600">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-600">
                                    State
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="pin" className="block text-sm font-medium leading-6 text-gray-600">
                                    PIN Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="pin"
                                        name="pin"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        pattern='[0-9]{6}'
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="pan" className="block text-sm font-medium leading-6 text-gray-600">
                                    PAN number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="pan"
                                        name="panNumber"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bank" className="block text-sm font-medium leading-6 text-gray-600">
                                    Bank Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="bank"
                                        name="bank"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bankAccType" className="block text-sm font-medium leading-6 text-gray-600">
                                    Account Type
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="bankAccType"
                                        name="bankAccType"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="accNumber" className="block text-sm font-medium leading-6 text-gray-600">
                                    Acc No.
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="accNumber"
                                        name="accNumber"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bankIFSC" className="block text-sm font-medium leading-6 text-gray-600">
                                    Bank IFSC
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="bankIFSC"
                                        name="bankIFSC"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        pattern='[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}'
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                            <div>
                                <label htmlFor="micr" className="block text-sm font-medium leading-6 text-gray-600">
                                    MICR Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="micr"
                                        name="micr"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        pattern='[0-9]{9}'
                                        title='Please enter 9 digit MICR code'
                                        maxLength='9'
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="aadhar" className="block text-sm font-medium leading-6 text-gray-600">
                                    Aadhar Card
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="aadhar"
                                        name="aadharFile"
                                        type="file"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleAadharFileChange}
                                        accept=".jpg, .jpeg, .png, .pdf"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="panDoc" className="block text-sm font-medium leading-6 text-gray-600">
                                    PAN Card
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="panDoc"
                                        name="panFile"
                                        type="file"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        pattern='[A-Z|a-z]{5}[0-9]{4}[A-Z|a-z]{1}'
                                        onChange={handlePanFileChange}
                                        accept=".jpg, .jpeg, .png, .pdf"
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-600">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className=" font-semibold text-primary hover:text-primary-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    {isLoading ? <Spinner /> : 'Sign in'}
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-primary hover:text-primary-500">
                                Start a 14 day free trial
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddAgent;