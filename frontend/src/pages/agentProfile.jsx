import React from 'react'

const dummyFormData = {
    name: 'John Doe',
    mobile: '9876543210',
    email: 'john.doe@example.com',
    username: 'johndoe123',
    password: 'password123',
    address: '123 Main Street',
    city: 'Anytown',
    state: 'State',
    pin: '12345',
    pan: 'ABCDE1234F',
    bank: 'XYZ Bank',
    bankAccType: 'Savings',
    micr: '123456789',
    accNumber: '9876543210',
    bankIFSC: 'XYZ1234567',
    docs: [
        {
            aadhar: '1234 5678 9012',
            pan: 'ABCDE1234F',
        }
    ]
};


const AgentProfile = () => {
    return (
        <div>
            <h1>Agent Profile</h1>

            <table className='border'>
                {
                    dummyFormData && Object.keys(dummyFormData).map((key, index) => {
                        return (
                            <tr key={index} className='border'>
                                <td className='px-5 py-3'>{key}</td>
                                <td className='px-5 py-3'>{key !== 'docs' && dummyFormData[key]}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AgentProfile
