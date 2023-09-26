"use client"

import { appwriteService } from '@/appwrite/config'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'

const ClientDetails = ({ params }: any) => {
    const [error, setError] = useState('')
    const [data, setData] = useState<Models.Document[]>([])
    const { id } = params

    useEffect(() => {
        fetchClient()
    }, []);

    const fetchClient = async () => {
        try {
            const { document } = await appwriteService.getClient(id)
            setData(document)
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div >
            <div className='flex justify-between items-center border-b pb-2'>
                <h1 className='font-bold '>Client Details</h1>
            </div>
            <div>
                {/* <ClientsTable data={data} /> */}
            </div>
        </div>
    )
}

export default ClientDetails