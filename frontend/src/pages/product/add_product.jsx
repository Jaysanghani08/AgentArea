import React, { useState } from 'react'
import { addProduct } from '../../services/Api';
import Spinner from '../../components/general/spinner';

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        type: '',
        company_id: '',
        product_name: '',
        product_type: '',
        agency_id: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
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
        <div className="h-screen flex justify-center items-center bg-light">
            <div className="border rounded-md px-3 bg-white shadow-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className='text-gray-800 text-3xl'>
                            Add <span className='text-primary'>Product</span>
                        </h1>
                        {/* <h2 className="mt-0 leading-9 tracking-tight text-gray-500">
                        Sign in to your account
                    </h2> */}
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" encType='multipart/form-data' onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-600">
                                    Company Name
                                </label>
                                <div className="mt-2">
                                    <select id='company' onChange={handleChange} name='company_id' required className='className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"' >
                                        <option value=''>Select Company</option>
                                        <option value='658f9aab2a7c2ed3429800b6'>Company 1</option>

                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="agency" className="block text-sm font-medium leading-6 text-gray-600">
                                    Agency Name
                                </label>
                                <div className="mt-2">
                                    <select id='agency' onChange={handleChange} name='agency_id' required className='className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"' >
                                        <option value=''>Select Agency</option>
                                        <option value='9'>Agency 1</option>

                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-600">
                                    Insurance Type
                                </label>
                                <div className="mt-2">
                                    <select id='type' onChange={handleChange} name='type' required className='className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"' >
                                        <option value=''>Select Type</option>
                                        <option value='health'>Health</option>
                                        <option value='motor'>Motor</option>
                                        <option value='sme'>SME</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="product_type" className="block text-sm font-medium leading-6 text-gray-600">
                                    Product Type
                                </label>
                                <div className="mt-2">
                                    <select id='product_type' onChange={handleChange} name='product_type' required className='className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"' >
                                        {formData.type === 'health' && (
                                            <>
                                                <option value=''>Select Product Type</option>
                                                <option value='individual'>Individiual</option>
                                                <option value='familyFloater'>Family Floater</option>
                                                <option value='personalAccident'>Personal Accident</option>
                                                <option value='travel'>Travel</option>
                                            </>
                                        )}
                                        {formData.type === 'motor' && (
                                            <>
                                                <option value=''>Select Product Type</option>
                                                <option value='privateCar'>Private Car</option>
                                                <option value='twoWheeler'>Two Wheeler</option>
                                                <option value='commercialVehicle'>Commercial Vehicle</option>
                                                <option value='miscellaneous'>Miscellaneous</option>
                                            </>
                                        )}
                                        {formData.type === 'sme' && (
                                            <>
                                                <option value=''>Select Product Type</option>
                                                <option value='fire'>Fire</option>
                                                <option value='marine'>Marine</option>
                                                <option value='workmenCompensation'>Workmen Compensation</option>
                                                <option value='other'>Other</option>
                                            </>
                                        )}
                                        {formData.type !== 'health' && formData.type !== 'motor' && formData.type !== 'sme' && (
                                            <>
                                                <option value=''>Select Insurance Type</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-600">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="product_name"
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

export default AddProduct;