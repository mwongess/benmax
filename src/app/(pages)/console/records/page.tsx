import React from 'react'

const Records = () => {
  return (
    <div >
      <div className='flex justify-between items-center border-b border-green-500 pb-2'>
        <h1 className='font-bold '>Clients</h1>
        <input className='search rounded bg-transparent border border-green-500 py-1 px-2' type="search" name="" id="" placeholder='Search record' />
      </div>
      <div>
        All clients
      </div>
    </div>
  )
}

export default Records