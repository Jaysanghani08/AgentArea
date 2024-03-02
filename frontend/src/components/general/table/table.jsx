import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import 'datatables.net-responsive-dt'
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css'
import 'datatables.net-rowreorder-dt/css/rowReorder.dataTables.min.css'
import "datatables.net-rowreorder-dt";
import './tables.css'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import tw from "twin.macro";

const Th = tw.th`bg-primary-500`;
const Table = tw.table`w-full border-collapse border border-gray-300 mt-4`;
const Span = tw.span`flex justify-center space-x-2`;
const GreenLink = tw.a`text-green-800 text-sm px-1 me-1 mb-1`;
const RedLink = tw.a`text-red-800 text-sm me-1 mb-1`;
const CustomButton = tw.button`bg-white text-primary-500 px-3 py-1 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium align-middle`;

const CustomTable = ({ columns, dataSet, buttonColumns = [], actionColumn = null }) => {
    // let DataTable = DataTables(window, $);
    const tableRef = useRef();

    useEffect(() => {
        // Initialize DataTable on component mount
        const table = $('#myTable').DataTable({
            responsive: true,
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            stripeClasses: ['evenRow', 'oddRow']
        });

        // Cleanup DataTable instance on component unmount
        return () => {
            table.destroy();
        };
    }, [columns, dataSet]);
    // Create a reference for the table
    return (
        <div className="table-responsive">
            <Table id='myTable' ref={tableRef}>
                <thead>
                    <tr >
                        <Th>#</Th>
                        {columns.map((column) => (
                            <Th key={column.title}>{column.title}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSet?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{rowIndex + 1}</td>
                            {columns?.map((column, colIndex) => (
                                <td key={colIndex} >
                                    {
                                        buttonColumns?.some((btnCol) => btnCol.columnIndex === colIndex) ? (
                                            buttonColumns?.map((btnCol) => (
                                                btnCol?.columnIndex === colIndex ? (
                                                    <CustomButton>
                                                        <a href={row[colIndex]} key={`###${btnCol.colIndex}`} className="text-primary bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-sm text-sm px-3 py-2 me-2 mb-2 ">
                                                            {btnCol.buttonText}
                                                        </a>
                                                    </CustomButton>
                                                ) : null
                                            ))
                                        )
                                            :
                                            (
                                                actionColumn && actionColumn.columnIndex === colIndex ? (
                                                    <Span>
                                                        <GreenLink href={row[colIndex][0]} key={`#${actionColumn.columnIndex}`}>
                                                            <FaRegEdit size={22} />
                                                        </GreenLink>
                                                        <RedLink href={row[colIndex][1]} key={`##${actionColumn.columnIndex}`}>
                                                            <MdDeleteOutline size={23} />
                                                        </RedLink>
                                                    </Span>
                                                ) :
                                                    (
                                                        row[colIndex]
                                                    )
                                            )
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    )
};

export default CustomTable;