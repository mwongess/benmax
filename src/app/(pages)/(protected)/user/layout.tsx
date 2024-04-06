import SideNav from '@/components/navs/SideNav'
import TopNav from '@/components/navs/TopNav'
import React from 'react'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
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
    )
}

export default UserLayout