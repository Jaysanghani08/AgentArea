import React, { useEffect, useState } from 'react'
import Spinner from '../../components/general/spinner';
import CustomTable from '../../components/general/table/table';
import { getCompanies, isLogged } from '../../services/Api';
import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";

export const Container = tw.div`relative flex items-center justify-center p-8 bg-blue-100 min-h-screen`;
export const TextContent = tw.div`mx-auto w-full max-w-[1050px] px-12 py-8 bg-white rounded-2xl shadow-2xl shadow-blue-800 bg-white`;
export const Subheading = tw(SubheadingBase)`mt-4 text-center md:text-left`;
export const Heading = tw(SectionHeading)`text-primary-500 mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
export const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;

const columns = [
    { title: "Name" },
    { title: "Website" },
    { title: "Products" },
    { title: "Agency" },
];

const buttonColumns = [
    { columnIndex: 2, buttonText: "Products" },
    { columnIndex: 3, buttonText: "Agency" },
];


const Company_list = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataSet, setDataSet] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {

            const companiesx = await getCompanies();

            setCompanies(companiesx.data);

            // console.log("JAYLO CHUTIYO");
            // console.log(companiesx.data);

            // console.log("SHUBHAM CHUTIYO");
            setIsLoading(false);
        }

        isLogged('admin') ? loadData() : setIsLoading(false);
    }, []);

    useEffect(() => {
        const tmp = async () => {

            const x = companies;
            const data = x?.map((company) => {
                return [
                    company.name,
                    company.url,
                    `/admin/productlist/${company._id}`,
                    `/admin/agencylist/${company._id}`,
                ];
            });

            setDataSet(data);
        }

        tmp();

    }, [companies]);

    return (
        <Container>
            <TextContent>
                <Heading>Your Companies</Heading>
                <HoriZontalLine/>
                {
                    !dataSet.length > 0 ?
                        <div >
                            <Spinner height={100} color='#a273ff' />
                        </div>
                        :
                        //     <CustomTable columns={columns} dataSet={dataSet} buttonColumns={buttonColumns} actionColumn={actionColumn} />
                        ((dataSet.length > 0)) && <CustomTable columns={columns} dataSet={dataSet} buttonColumns={buttonColumns} />
                }
            </TextContent>
        </Container>
    )
}

export default Company_list
