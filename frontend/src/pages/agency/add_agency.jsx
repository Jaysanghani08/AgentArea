import React, { useState } from 'react'
import { addAgency } from '../../services/Api';
import Spinner from '../../components/general/spinner';

const AddAgency = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
       name: '',
       code: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setIsLoading(true);

        try {
            const response = await addAgency(formData);

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
        <div className="h-screen flex justify-center items-center bg-light">
            <div className="border rounded-md px-3 bg-white shadow-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className='text-gray-800 text-3xl'>
                            Add <span className='text-primary'>Company</span> 
                        </h1>
                        {/* <h2 className="mt-0 leading-9 tracking-tight text-gray-500">
                        Sign in to your account
                    </h2> */}
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" encType='multipart/form-data' onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-600">
                                    Agency Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="tel"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-600">
                                    Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="url"
                                        name="code"
                                        type="text"
                                        autoComplete="tel"
                                        required
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    {isLoading ? <Spinner /> : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddAgency;