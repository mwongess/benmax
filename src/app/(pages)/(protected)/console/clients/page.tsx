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


const Clients = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState<Models.Document[]>([])
    
    const router = useRouter()

    useEffect(() => {
        fetchClients()
        const unsubscribe = appwriteClient.subscribe(`databases.${config.appwriteDatabaseId}.collections.${config.appwriteClientsCollectionId}.documents`, (response: any) => {

            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                setData((prevState: any) => [...prevState, response.payload])
            }

            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                setData((prevState: any[]) => prevState.filter(client => client.$id !== response.payload.$id))
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const fetchClients = async () => {
        try {
            const { documents } = await appwriteService.getClients()
            setData(documents)
        } catch (error: any) {
            setError(error.message)
        }
    }


    const goToCreateNew = () => {
      router.push('/console/clients/new')
    }
    return (
        <div >
            <div className='flex justify-between items-center border-b pb-2'>
                <h1 className='font-bold'>All Clients</h1>
                <button onClick={goToCreateNew} className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare/> New Client</button>
            </div>
            <div>
                <ClientsTable data={data} />
            </div>
        </div>
    )
}

export default Clients