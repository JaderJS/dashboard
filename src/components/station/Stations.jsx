import React, { useState, useEffect } from 'react'

import axios from 'axios'

import StationCard from './StationCard'

const ENDPOINT = 'http://localhost:3010/api/station'

const Stations = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3010/api/station').then((response) => {
            setData(() => response.data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    return (
        <>
            {data && data.map((data) => {
                return (
                    <div key={data._id} className='py-3'>
                        <StationCard data={data} />
                    </div>
                )
            })}
        </>
    )
}

export default Stations
