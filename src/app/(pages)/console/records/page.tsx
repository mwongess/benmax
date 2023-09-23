import { ClientsTable } from '@/components/ClientsTable'
import React from 'react'

const Records = () => {
  return (
    <div >
      <div className='flex justify-between items-center border-b pb-2'>
        <h1 className='font-bold '>Clients</h1>
      </div>
      <div>
       <ClientsTable/>
      </div>
    </div>
  )
}

export default Records