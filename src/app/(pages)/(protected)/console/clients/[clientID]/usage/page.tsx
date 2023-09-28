"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import { UsageTable } from '@/components/UsageTable'
import config from '@/config/conf'
import { Models } from 'appwrite'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'

const ClientsUsage = ({ params }: { params: { clientID: string } }) => {
  const [error, setError] = useState('')

  const { clientID } = params
  const [data, setData] = useState<Models.Document[]>([])
    
  const router = useRouter()

  useEffect(() => {
      fetchClients()
      const unsubscribe = appwriteClient.subscribe(`databases.${config.appwriteDatabaseId}.collections.${config.appwriteUsageCollectionId}.documents`, (response: any) => {

          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
              setData((prevState: any) => [response.payload, ...prevState])
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
          const { documents } = await appwriteService.getUsage()
          setData(documents.filter((document)=> document.clientID === clientID))
      } catch (error: any) {
          setError(error.message)
      }
  }
  const goToCreateNew = () => {
    router.push('usage/new')
  }
  return (
    <div>
      <div className='flex justify-between items-center font-bold border-b pb-2'>
        <h1 className='font-bold'>All Months Usage</h1>
        <button onClick={goToCreateNew} className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare/> New Month Record</button>
      </div>
      <UsageTable data={data} />
    </div>
  )
}

export default ClientsUsage