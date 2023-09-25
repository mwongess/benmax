"use client"
import Image from 'next/image'
import React, { FormEvent } from 'react'

const Signup = () => {
  const signup = (e: FormEvent) => {
    e.preventDefault()
    console.log("Submitted");

  }
  return (
    <div className="login flex  h-screen w-full">
      <div className="hidden sm:flex flex-col items-center justify-end h-full w-1/2 text-center p-4">
        <h1 className="font-bold text-6xl tracking-wider mb-6">BenmaX is Live</h1>
        <Image className="text-blue-500" src="/cloud.svg" height={150} width={480} alt="projection" />
      </div>
      <form className="flex flex-col justify-center items-center h-full w-full sm:w-1/2 bg-white" onSubmit={signup}>
        <div className="w-[75%]">
          <div>
            <h1 className="font-bold text-3xl ">Sign up</h1>
          </div>
          <div className="my-5">
            <label htmlFor="username">Username*</label>
            <input type="text" placeholder="Enter your username" required />
          </div>
          <div className="mb-5">
            <label htmlFor="username">Phone*</label>
            <input type="text" placeholder="Enter your phone" required />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button className="text-white bg-blue-500 p-2 rounded w-full border border-none mt-6" type="submit">Signup</button>
        </div>

      </form>
    </div>
  )
}

export default Signup