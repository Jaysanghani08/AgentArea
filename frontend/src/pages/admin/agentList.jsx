import React, { useState, useEffect } from 'react'
import { getAgents } from './../../services/Api'
import Spinner from './../../components/general/spinner'

const AgentList = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [AgentListData, setAgentListData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getAgents();
                console.log(response?.data);

                if (response.status === 200) {
                    setAgentListData(response.data);
                } else {
                    alert('Something went wrong. Please try again later.')
                }
            }
            catch (err) {
                console.log(err);
                alert('Something went wrong. Please try again later.')
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [])


    return (
        <div>
            <h1>Agent List</h1>
            {
                isLoading ? <Spinner />
                    :
                    <table className='border mt-5'>
                        <thead>
                            <tr className='bg-gray-300'>
                                <th className='px-5 py-3'>Name</th>
                                <th className='px-5 py-3'>Mobile</th>
                                <th className='px-5 py-3'>Email</th>
                                <th className='px-5 py-3'>_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AgentListData && AgentListData.map((item, index) => {
                                    return (
                                        <tr key={index} className='border'>
                                            <td className='px-5 py-3'>{item.name}</td>
                                            <td className='px-5 py-3'>{item.mobile}</td>
                                            <td className='px-5 py-3'>{item.email}</td>
                                            <td className='px-5 py-3'>{item._id}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default AgentList
