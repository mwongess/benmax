"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/console')
  }, [])
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-xl'>BenMaX</h1>
      <p className='text-lg'>Launching page ...</p>
    </div>
  )
}
