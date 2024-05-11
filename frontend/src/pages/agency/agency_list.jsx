import React, { useState, useEffect } from 'react'
import { getAgencies } from '../../services/Api';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/general/spinner';
import CustomTable from '../../components/general/table/table';
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import tw from "twin.macro";

export const Container = tw.div`relative flex items-center justify-center p-8 bg-blue-100 min-h-screen`;
export const TextContent = tw.div`mx-auto w-full max-w-[1050px] px-12 py-8 bg-white rounded-2xl shadow-2xl shadow-blue-800 bg-white`;
export const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
export const Heading = tw(SectionHeading)`text-primary-500 mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
export const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;

// {
//     "name": "jainil",
//     "code": 121212,
//     "_id": "659c692120de061edfa152a6"
// }

const AgencyList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const companyId = useLocation().pathname.split('/')[3];

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const response = await getAgencies(companyId);
                // console.log(response?.data);
                if (response.status === 200) {
                    const data = response.data?.map((agency) => {
                        return [
                            agency.name,
                            agency.code,
                            // agency._id
                        ];
                    });;
                    // console.log(data);
                    setProducts(data);
                    setIsLoading(false);
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
        <Container>
            <TextContent>
                <Heading>Agency</Heading>
                <HoriZontalLine />
                {
                    isLoading ?
                        <div >
                            <Spinner height={100} color='#a273ff' />
                        </div>
                        :
                        //     <CustomTable columns={columns} dataSet={dataSet} buttonColumns={buttonColumns} actionColumn={actionColumn} />
                        ((products.length > 0)) ? <CustomTable columns={[
                            { title: "Name" },
                            { title: "Code" },
                            // { title: "Action" }
                        ]} dataSet={products} 
                        // actionColumn={{ columnIndex: 2 }} 
                        />
                            : <div>No Agencies found</div>
                }
            </TextContent>
        </Container>
    )
}

export default AgencyList
