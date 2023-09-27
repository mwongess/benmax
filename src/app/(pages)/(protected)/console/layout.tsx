"use client"

import { appwriteService } from '@/appwrite/config'
import SideNav from '@/components/navs/SideNav'
import TopNav from '@/components/navs/TopNav'
import { AuthProvider } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ConsoleLayout = ({ children }: { children: React.ReactNode }) => {

  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState<any>()
  const router = useRouter()
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      let accountDetails = await appwriteService.getCurrentUser()
      setUser(accountDetails)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <AuthProvider value={{ user, authStatus, setAuthStatus }}>
      {
        // user &&
        <div className='flex min-h-screen'>
          <div className='hidden sm:block left w-[15%] border-r p-2'>
            <SideNav />
          </div>
          <div className="right w-full sm:w-[85%]">
            <div className='h-[9vh] border-b p-2'>
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