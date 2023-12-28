import React from 'react'
import CustomTable from '../components/general/table/table'

const Tmp = () => {

    const columns = [
        { title: "Name" },
        { title: "Occupation" },
        { title: "City" },
        { title: "ZIP" },
        { title: "Birthday" },
        { title: "Salary" },
    ];

    const dataSet = [
        [
            "Tiger Nixon",
            "System Architect",
            "Edinburgh",
            "5421",
            "2011/04/25",
            ["https://youtube.com", "https://www.google.com"],
        ],
        [
            "Ashton Cox",
            "Junior Technical Author",
            "San Francisco",
            "1562",
            "2009/01/12",
            "$86,000",
        ],
        [
            "John Doe",
            "Senior Software Engineer",
            "New York",
            "1234",
            "2015/07/20",
            "$120,000"
        ],
        [
            "Emily Smith",
            "UX/UI Designer",
            "Los Angeles",
            "7890",
            "2018/04/05",
            "$95,000"
        ],
        [
            "Michael Johnson",
            "Data Scientist",
            "Chicago",
            "4532",
            "2017/09/15",
            "$110,000"
        ],
        [
            "Sarah Davis",
            "Marketing Manager",
            "Seattle",
            "8765",
            "2016/02/28",
            "$95,500"
        ],
        [
            "Alex Turner",
            "Software Developer",
            "Austin",
            "2314",
            "2020/11/10",
            "$105,000"
        ],
        [
            "Megan Wilson",
            "Financial Analyst",
            "Denver",
            "6789",
            "2019/07/03",
            "$92,000"
        ],
        [
            "Sophie Wilson",
            "UX Designer",
            "Seattle",
            "9876",
            "2018/03/15",
            "$95,000"
        ],
        [
            "Owen Davis",
            "Software Developer",
            "San Francisco",
            "2345",
            "2015/09/22",
            "$110,000"
        ],
        [
            "Isabella Miller",
            "Marketing Specialist",
            "Los Angeles",
            "6789",
            "2017/05/10",
            "$92,500"
        ],
        [
            "Ethan Brown",
            "Project Manager",
            "Denver",
            "3210",
            "2016/01/08",
            "$105,000"
        ],
        [
            "Olivia Taylor",
            "Financial Analyst",
            "Chicago",
            "7654",
            "2019/11/20",
            "$98,500"
        ],
        [
            "Lucas Martinez",
            "Customer Support Representative",
            "Dallas",
            "4321",
            "2014/07/12",
            "$88,000"
        ],
        [
            "Emma Rodriguez",
            "HR Manager",
            "Miami",
            "5678",
            "2020/02/18",
            "$115,000"
        ],
        [
            "Mia Turner",
            "Data Scientist",
            "Houston",
            "8765",
            "2013/06/25",
            "$103,000"
        ],
        [
            "Liam Johnson",
            "Network Administrator",
            "Phoenix",
            "2198",
            "2011/12/03",
            "$96,500"
        ],
        [
            "Aiden Smith",
            "Product Manager",
            "San Diego",
            "5432",
            "2012/04/30",
            "$112,500"
        ],
        [
            "Ella Davis",
            "Graphic Designer",
            "Portland",
            "6543",
            "2015/08/08",
            "$85,000"
        ],
        [
            "Logan Wilson",
            "Sales Manager",
            "Austin",
            "3456",
            "2016/10/14",
            "$107,000"
        ],
        [
            "Grace Brown",
            "IT Consultant",
            "New York",
            "7890",
            "2017/03/05",
            "$94,000"
        ],
        [
            "Jackson Turner",
            "Operations Manager",
            "Chicago",
            "4567",
            "2014/09/01",
            "$110,500"
        ],
        [
            "Scarlett Martinez",
            "Product Analyst",
            "Seattle",
            "8901",
            "2019/02/12",
            "$93,200"
        ]



    ];

    const buttonColumns = [
        { columnIndex: 2, buttonText: "Click me" },
        { columnIndex: 4, buttonText: "Press" },
    ];

    const actionColumn = { columnIndex: 5 };

    return (
        <CustomTable buttonColumns={buttonColumns} columns={columns} dataSet={dataSet} actionColumn={actionColumn}></CustomTable>
    )
}

export default Tmp
