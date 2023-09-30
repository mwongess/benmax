"use client"

import { smsEndpoint } from '@/app/utils/smsEndpoint'
import { appwriteClient, appwriteService } from '@/appwrite/config'
import { UsageTable } from '@/components/UsageTable'
import { toast } from '@/components/ui/use-toast'
import config from '@/config/conf'
import { Models } from 'appwrite'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'

const ClientsUsage = ({ params }: { params: { clientID: string } }) => {
  const [error, setError] = useState('')
  const [clientName, setClientName] = useState('')
  const [loading, setLoading] = useState(false)
  const [clientDetails, setClientDetails] = useState<any>({})

  const { clientID } = params
  const [data, setData] = useState<Models.Document[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchClientName()
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
  const fetchClientName = async () => {
    try {
      setLoading(true)
      const client = await appwriteService.getClient(clientID)
      if (client) {
        setClientDetails(client)

        setClientName(client.name)
        setLoading(false)
      }
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }
  const fetchClients = async () => {
    try {
      setLoading(true)
      const { documents } = await appwriteService.getUsage()
      if (documents) {
        setData(documents.filter((document) => document.clientID === clientID))
        setLoading(false)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }
  const alertCustomer = async (usageDetails: any) => {

    try {

      const options = {
        to: clientDetails.phone,
        message: `Hello, ${clientDetails.name}.Your ${usageDetails.month} bill for meter ${clientDetails.meter} is ready for payment Consumed Units: ${usageDetails.consumedUnits} Total Bill: ${usageDetails.total} KES. Paid: ${usageDetails.paid} KES. Balance:  ${usageDetails.cumulativeTotal} KES. Regards, Benmax 0722588147.
         `
      }
      const response = await axios.post(smsEndpoint, options, { headers: { 'Content-Type': 'application/json' } })
      console.log(response);
      if(response.status === 200){
        toast({
          title:"Message sent",
        })
      }
      
    } catch (error) {
      console.error(error)
    }

  }
  const goToCreateNew = () => {
    router.push('usage/new')
  }
  if (loading) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center font-bold border-b pb-2'>
          <h1 className='font-bold h-[2rem] w-1/4 bg-gray-400 animate-pulse rounded'>
          </h1>
          <button className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare /> New Month Record</button>
        </div>
        <div className=''>
          <div className='flex justify-between items-center mb-5 w-full'>
            <p className='bg-gray-400 animate-pulse h-[2rem] w-[30%]'></p>
            <p className='bg-gray-400 animate-pulse h-[2.5rem] w-[7rem]'></p>
          </div>
          <div className='bg-gray-400 animate-pulse w-full h-[20rem] rounded'>

          </div>
        </div>
      </div>)
  }
  return (
    <div>
      <div className='flex justify-between items-center font-bold border-b pb-2'>
        <h1 className='font-bold'>All Months Usage For:  <span className='text-lg underline'>{clientName}</span></h1>
        <button onClick={goToCreateNew} className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare /> New Month Record</button>
      </div>
      <UsageTable data={data} alertCustomer={alertCustomer} />
    </div>
  )
}

export default ClientsUsage