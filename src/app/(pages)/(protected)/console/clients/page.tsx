"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import { ClientsTable } from '@/components/ClientsTable'
import config from '@/config/conf'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { smsEndpoint } from '@/app/utils/smsEndpoint'

const Clients = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState<Models.Document[]>([])


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

    return (
        <div >
            <div className='flex justify-between items-center border-b pb-2'>
                <h1 className='font-bold '>Clients</h1>
            </div>
            <div>
                <ClientsTable data={data} />
            </div>
        </div>
    )
}

export default Clients