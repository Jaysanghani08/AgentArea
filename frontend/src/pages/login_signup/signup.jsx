import React from 'react';
import * as Form from '@radix-ui/react-form';

const Signup = () => (
    <div className="h-screen flex justify-center items-center bg-light">
        <div className="border rounded-md px-3 bg-white shadow-lg">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-600">
                                Mobile No.
                            </label>
                            <div className="mt-2">
                                <input
                                    id="tel"
                                    name="tel"
                                    type="tel"
                                    pattern='(\+[1-9][0-9]{0,2})?[6-9]\d{9}'
                                    autoComplete="tel"
                                    required
                                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
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
                                Sign in
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
);

export default Signup;