import { UsageTable } from '@/components/UsageTable'
import React from 'react'

const ClientsUsage = ({params}: {params: {id:string}}) => {
  const {id: USER_ID} = params
  return (
    <div>
      <UsageTable data={[]}/>
    </div>
  )
}

export default ClientsUsage