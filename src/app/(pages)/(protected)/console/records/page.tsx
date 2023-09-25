"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import { ClientsTable } from '@/components/ClientsTable'
import config from '@/config/conf'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
      console.log(documents);
    } catch (error: any) {
      setError(error.message)
    }
  }

  const alertCustomer = async (id: string) => {
    const customerDetails = data.find((document) => document.$id == id)
    const response = await axios.post('https://api.mobitechtechnologies.com/sms/sendsms', {
      "mobile": customerDetails?.phone,
      "response_type": "json",
      "sender_name": "23107",
      "service_id": 0,
      "message": "Hello"
    }, {
      headers: {
        'Content-Type': 'application/json',
        "h_api_key": "1280e11578b357bad225b671cb7118feee1e7539ef42bb45388e2b962a7f8277",
      }
    })
    console.log(response);
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