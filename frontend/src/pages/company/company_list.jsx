import React, { useState } from 'react'
import Spinner from '../../components/general/spinner';
import { Link } from 'react-router-dom';

const companies = [
    {
        name: 'LIC',
        website: 'https://lic.com'
    },
    {
        name: 'LIC2',
        website: 'https://lic2.com'
    },
    {
        name: 'LIC3',
        website: 'https://lic3.com'
    },
    {
        name: 'LIC4',
        website: 'https://lic4.com'
    }
]

const Company_list = () => {

    const [isLoading, setIsLoading] = useState(false);


    return (
        <div>
            <h1>Your Companies</h1>
            {
                isLoading ? <Spinner /> :
                    <table className='border'>
                        <thead>
                            <th className='px-5 py-3'>Id</th>
                            <th className='px-5 py-3'>Name</th>
                            <th className='px-5 py-3'>Website</th>
                            <th className='px-5 py-3'>Agency</th>
                            <th className='px-5 py-3'>Products</th>
                            <th className='px-5 py-3'>Actions</th>
                        </thead>
                        <tbody>
                            {
                                companies && companies.map((item, index) => {
                                    return (
                                        <tr key={index} className='border'>
                                            <td className='px-5 py-3'>{index + 1}</td>
                                            <td className='px-5 py-3'>{item.name}</td>
                                            <td className='px-5 py-3'>
                                                <a href={item.website} target='_blank' >{item.website}</a>
                                            </td>
                                            <td className='px-5 py-3'>

                                                <a href="#" class="text-black ring-2 hover:bg-secondary focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-secondary focus:outline-none dark:focus:ring-primary">Read more</a>

                                            </td>
                                            <td className='px-5 py-3'>{item.website}</td>
                                            <td className='px-5 py-3'>{item.website}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table >
            }
        </div >
    )
}

export default Company_list
