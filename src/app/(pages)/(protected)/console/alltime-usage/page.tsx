"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import { AllTimeUsageTable } from '@/components/AllTimeUsageTable'
import config from '@/config/conf'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'

const AllTimeUsage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<Models.Document[]>([])

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
      setLoading(true)
      const { documents } = await appwriteService.getUsage()
      if (documents) {
        setData(documents)
        setLoading(false)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (loading) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center font-bold border-b pb-2'>
          <h1 className='font-bold h-[2rem] w-1/4 bg-gray-300 animate-pulse rounded'>
          </h1>
          <button className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare /> New Month Record</button>
        </div>
        <div className=''>
          <div className='flex justify-between items-center mb-5 w-full'>
            <p className='bg-gray-300 animate-pulse h-[2rem] w-[30%]'></p>
            <p className='bg-gray-300 animate-pulse h-[2.5rem] w-[7rem]'></p>
          </div>
          <div className='bg-gray-300 animate-pulse w-full h-[20rem] rounded'>

          </div>
        </div>
      </div>)
  }
  return (
    <div className='text-slate-200'>
      <div className='flex justify-between items-center font-bold border-b border-slate-200 pb-2'>
        <h1 className='font-bold'>All  Months Usage For:  <span className='text-lg underline'>All Clients</span></h1>
      </div>
      <AllTimeUsageTable data={data} />
    </div>
  )
}

export default AllTimeUsage