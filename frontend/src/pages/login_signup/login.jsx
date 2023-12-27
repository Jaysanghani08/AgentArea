import React from 'react';
import * as Form from '@radix-ui/react-form';

const Signup = () => (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-light">
        <div className='border rounded-md bg-white px-[30px] md:px-[50px] py-9'>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                    alt="Your Company"
                /> */}
                <h1 className='text-gray-800 text-3xl'>
                    <span className='text-primary'>Agent</span> area
                </h1>
                <h2 className="mt-0 leading-9 tracking-tight text-gray-500">
                    Sign in to your account
                </h2>
            </div>

            <Form.Root className="w-[260px] md:w-[340px] mt-5">
                <Form.Field className="grid mb-[10px]" name="phone">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-600">
                            Mobile No.
                            <sup className="text-red">*</sup>
                        </Form.Label>
                        <Form.Message className="text-[13px] text-red opacity-[0.8]" match="valueMissing">
                            Please enter your Mobile No.

                        </Form.Message>
                        <Form.Message className="text-[13px] ms-5 text-red opacity-[0.8]" match="patternMismatch">
                            Please provide a valid Mobile.
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            className="box-border px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            type="tel"
                            pattern='(\+[1-9][0-9]{0,2})?[6-9]\d{9}'
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mt-5 mb-[10px]" name="question">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-600">
                            Password
                            <sup className="text-red"> *</sup>
                        </Form.Label>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                            Please enter a password
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            className="box-border px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            type='password'
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button className=" mt-4 box-border w-full text-white shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-primary px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                        Get OTP
                    </button>
                </Form.Submit>
            </Form.Root>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="#" className="font-semibold leading-6 text-primary hover:text-primary-500">
                    Start a 14 day free trial
                </a>
            </p>
        </div>
    </div>
);

export default Signup;