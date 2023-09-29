"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import { ClientsTable } from '@/components/ClientsTable'
import config from '@/config/conf'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { smsEndpoint } from '@/app/utils/smsEndpoint'
import { FaRegPlusSquare } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'


const Clients = () => {
    const [error, setError] = useState('')

    const { clients } = useAuth()

    const router = useRouter()

    const goToCreateNew = () => {
        router.push('/console/clients/new')
    }

    const deleteClient = async (clientID: string) => {
        try {
            const res = await appwriteService.deleteClient(clientID)
        } catch (error: any) {
            setError(error.message)
        }
    }
    return (
        <div >
            <div className='flex justify-between items-center border-b pb-2'>
                <h1 className='font-bold'>All Clients</h1>
                <button onClick={goToCreateNew} className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare /> New Client</button>
            </div>
            <div>
                <ClientsTable data={clients} deleteClient={deleteClient}/>
            </div>
        </div>
    )
}

export default Clients