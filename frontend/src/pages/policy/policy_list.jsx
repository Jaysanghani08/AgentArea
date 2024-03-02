import React, { useEffect } from 'react'
import { getPolicies } from '../../services/Api'

const PolicyList = () => {

    useEffect(() => {
        const loadData = async () => {
            // try {
                const response = await getPolicies();
                console.log(response?.data);
                // if (response.status === 200) {
                //     const data = response.data?.map((agency) => {
                //         return [
                //             agency.name,
                //             agency.code,
                //             // agency._id
                //         ];
                //     });;
                //     console.log(data);
                //     setProducts(data);
                //     setIsLoading(false);
                // } else {
                //     alert('Something went wrong. Please try again later.')
                // }
            // }
            // catch (err) {
            //     console.log(err);
            //     // alert('Something went wrong. Please try again later.')
            // } finally {
            //     // setIsLoading(false);
            // }
        }

        loadData();
    }, [])

    return (
        <div>
            Product List
        </div>
    )
}

export default PolicyList
