import React, { useEffect } from 'react'
import { getPolicy } from './../../services/Api'

const GetPolicy = () => {


    useEffect(() => {

        const loadPolicy = async () => {
            const response = await getPolicy()
            console.log(response)
        }
        loadPolicy()
    }
    , [])

    return (
        <div>
            <h1>Get Policy</h1>
        </div>
    )
}

export default GetPolicy
