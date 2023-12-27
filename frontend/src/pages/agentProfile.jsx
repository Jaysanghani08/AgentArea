import React, { useState, useEffect, useRef } from 'react'
import { getFullAgent } from './../services/Api'
import Spinner from './../components/general/spinner'

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

const PdfViewer = ({ fileData }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        // Create a Blob from the PDF buffer
        const pdfBlob = new Blob([fileData.buffer.data], { type: fileData.mimetype });

        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Set the src attribute of the iframe to the Blob URL
        iframeRef.current.src = pdfUrl;

        // Clean up the URL when the component is unmounted
        return () => URL.revokeObjectURL(pdfUrl);
    }, [fileData]);

    //   <iframe
    //     ref={iframeRef}
    //     title="PDF Viewer"
    //     width="100%"
    //     height="600px"
    //     frameBorder="0"
    //   />

};

const AgentProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [agentListData, setAgentListData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getFullAgent('658bed167dd0bb526193617e');
                console.log(response?.data?.docs[0].aadhar);


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
            <h1>Agent Profile</h1>
            {
                isLoading ? <Spinner /> :
                    <table className='border'>
                        <thead>
                            <th className='px-5 py-3'>Key</th>
                            <th className='px-5 py-3'>Value</th>
                        </thead>
                        <tbody>
                            {
                                agentListData && Object.entries(agentListData).map((item, index) => {
                                    return (
                                        item[0] !== 'docs' &&
                                        <tr key={index} className='border'>
                                            <td className='px-5 py-3'>{item[0]}</td>
                                            <td className='px-5 py-3'>{item[1]}</td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                agentListData && agentListData.docs[0].aadhar &&
                                <>
                                    <tr>
                                        <td className='px-5 py-3'>Aadhar</td>
                                        <td className='px-5 py-3'>
                                            {/* <PdfViewer fileData={agentListData.docs[0].aadhar} /> */}
                                            {agentListData.docs[0].aadhar.originalname}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='px-5 py-3'>Pan</td>
                                        <td className='px-5 py-3'>
                                            {/* <PdfViewer fileData={agentListData.docs[0].aadhar} /> */}
                                            {agentListData.docs[0].pan.originalname}
                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default AgentProfile
