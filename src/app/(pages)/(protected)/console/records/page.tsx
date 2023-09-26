"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import { ClientsTable } from '@/components/ClientsTable'
import config from '@/config/conf'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { smsEndpoint } from '@/app/utils/smsEndpoint'

const Records = () => {
  const [error, setError] = useState('')
  const [data, setData] = useState<Models.Document[]>([])


  useEffect(() => {
    fetchClients()
    const unsubscribe = appwriteClient.subscribe(`databases.${config.appwriteDatabaseId}.collections.${config.appwriteCollectionId}.documents`, (response: any) => {

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

  const alertCustomer = async (id: string) => {

    try {
      const customerDetails = data.find((document) => document.$id == id)
      const options = {
        to: customerDetails?.phone,
        message: `Hello , ${customerDetails?.name}.You bill is ${customerDetails?.totalBill}`
      }
      const response = await axios.post(smsEndpoint, options, { headers: { 'Content-Type': 'application/json' } })
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div >
      <div className='flex justify-between items-center border-b pb-2'>
        <h1 className='font-bold '>Clients</h1>
      </div>
      <div>
        <ClientsTable data={data} alertCustomer={alertCustomer} />
      </div>
    </div>
  )
}

export default Records