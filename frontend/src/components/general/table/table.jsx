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
    return <table id='myTable' ref={tableRef}>
        <thead>
            <tr>
                <th>#</th>
                {columns.map((column) => (
                    <th key={column.title}>{column.title}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {dataSet.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex}>
                            {
                                buttonColumns.some((btnCol) => btnCol.columnIndex === colIndex) ? (
                                    buttonColumns.map((btnCol) => (
                                        btnCol.columnIndex === colIndex ? (
                                            <a href={row[colIndex]} key={`###${btnCol.colIndex}`} className="text-primary bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-sm text-sm px-3 py-2 me-2 mb-2 ">
                                                {btnCol.buttonText}
                                            </a>
                                        ) : null
                                    ))
                                )
                                    :
                                    (
                                        actionColumn && actionColumn.columnIndex === colIndex ? (
                                            <span className="flex">
                                                {/* <span className=""> */}
                                                <a href={row[colIndex][0]} key={`#${actionColumn.columnIndex}`} className="text-green border-green Ï">
                                                    <FaRegEdit size={22} />
                                                </a>
                                                {/* </span> */}
                                                <a href={row[colIndex][1]} key={`##${actionColumn.columnIndex}`} className=" text-red border-red">
                                                    <MdDeleteOutline size={23} />
                                                </a>
                                            </span>
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
    </table>;
};

export default CustomTable;