"use client"

import { UsageTable } from '@/components/UsageTable'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPlus, FaRegPlusSquare } from 'react-icons/fa'

const ClientsUsage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const { id: USER_ID } = params
  const goToCreateNew = () => {
    router.push('usage/new')
  }
  return (
    <div>
      <div className='flex justify-between items-center font-bold border-b pb-2'>
        <h1 className='font-bold'>All Months Usage</h1>
        <button onClick={goToCreateNew} className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare/> New Month Record</button>
      </div>
      <UsageTable data={[]} />
    </div>
  )
}

export default ClientsUsage