"use client"

import { appwriteClient, appwriteService } from '@/appwrite/config'
import SideNav from '@/components/navs/SideNav'
import TopNav from '@/components/navs/TopNav'
import config from '@/config/conf'
import { AuthProvider } from '@/context/authContext'
import { Models } from 'appwrite'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ConsoleLayout = ({ children }: { children: React.ReactNode }) => {

  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState<any>()
  const [clients, setClients] = useState<Models.Document[]>([])
  const [clientUsage, setClientUsage] = useState<Models.Document[]>([])
  const [error, setError] = useState<any>('')

  const router = useRouter()
  const { clientID } = useParams()

  useEffect(() => {
    getUser()
    fetchClients()
    const unsubscribe = appwriteClient.subscribe(`databases.${config.appwriteDatabaseId}.collections.${config.appwriteClientsCollectionId}.documents`, (response: any) => {

      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        setClients((prevState: any) => [response.payload, ...prevState,])
      }
      if (response.events.includes("databases.*.collections.*.documents.*.update")) {
        fetchClients()
      }
      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        setClients((prevState: any[]) => prevState.filter(client => client.$id !== response.payload.$id))
      }
    });

    return () => {
      unsubscribe();
    };
  }, [])

  const getUser = async () => {
    try {
      let accountDetails = await appwriteService.getCurrentUser()
      setUser(accountDetails)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchClients = async () => {
    try {
      const { documents } = await appwriteService.getClients()
      setClients(documents)
    } catch (error: any) {
      setError(error.message)
    }
  }

  // useEffect(() => {
  //   console.log(clientID);

  // }, [clientID])

  return (
    <AuthProvider value={{ user, authStatus, setAuthStatus, clients, setClients, clientUsage }}>
      {
        // user &&
        <div className='flex min-h-screen'>
          <div className='hidden sm:block left w-[15%] border-r border-slate-200 p-2'>
            <SideNav />
          </div>
          <div className="right w-full sm:w-[85%]">
            <div className='h-[9vh] border-b border-slate-200 p-2'>
              <TopNav />
            </div>
            <div className='p-4'>
              {children}
            </div>
          </div>
        </div>
      }
    </AuthProvider>

  )
}

export default ConsoleLayout