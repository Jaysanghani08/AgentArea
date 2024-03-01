import React, { useEffect, useState } from 'react'
import Spinner from '../../components/general/spinner';
import CustomTable from '../../components/general/table/table';
import { getCompanies } from '../../services/Api';

const columns = [
    { title: "Name" },
    { title: "Website" },
    { title: "Products" },
    { title: "Agency" },
    { title: "Action" },
];

// const dataSet = [
//     [
//         "Tiger Nixon",
//         "System Architect",
//         "Edinburgh",
//         "5421",
//         ["https://youtube.com", "https://www.google.com"],
//     ],
//     [
//         "Ashton Cox",
//         "Junior Technical Author",
//         "San Francisco",
//         "1562",
//         ["https://youtube.com", "https://www.google.com"],
//     ],
//     [
//         "John Doe",
//         "Senior Software Engineer",
//         "New York",
//         "1234",
//         ["https://youtube.com", "https://www.google.com"],
//     ],
//     [
//         "Emily Smith",
//         "UX/UI Designer",
//         "Los Angeles",
//         "7890",
//         ["https://youtube.com", "https://www.google.com"],
//     ],
//     [
//         "Michael Johnson",
//         "Data Scientist",
//         "Chicago",
//         "4532",
//         ["https://youtube.com", "https://www.google.com"],
//     ],

// ];

const buttonColumns = [
    { columnIndex: 2, buttonText: "Products" },
    { columnIndex: 3, buttonText: "Agency" },
];

const actionColumn = { columnIndex: 4 };

const Company_list = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            const companies = await getCompanies();
            // console.log(companies);
            let data = [];
            setTimeout(async () => {
                data = await companies?.data?.map((company) => {
                    return [
                        company.name,
                        company.url,
                        company._id,
                        company._id,
                        ["/", "/"],
                    ];
                });
                console.log(data);
                // console.log(data);
                setDataSet(data);
                setIsLoading(false);
            }, 3000);
        }

        loadData();
    }, []);

    console.log(dataSet);

    return (
        <div>
            <h1>Your Companies</h1>
            {
                // dataSet.length > 0 ? <Spinner height={100} color='#000000'/> :
                //     <CustomTable columns={columns} dataSet={dataSet} buttonColumns={buttonColumns} actionColumn={actionColumn} />
                <CustomTable columns={columns} dataSet={dataSet} buttonColumns={buttonColumns} actionColumn={actionColumn} />
            }
        </div >
    )
}

export default Company_list
