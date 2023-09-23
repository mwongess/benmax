"use client"
import React, { FormEvent } from 'react'

const Signup = () => {
  const signup = (e: FormEvent)=> {
    e.preventDefault()
    console.log("Submitted");
    
  }
  return (
    <div className="login flex justify-center items-center  h-screen">
      <form onSubmit={signup}>
        <div className="mb-2">
          <label htmlFor="username">Username</label>
          <input  type="text" placeholder="Enter your username" required/>
        </div>
        <div className="mb-2">
          <label htmlFor="username">Phone</label>
          <input  type="text" placeholder="Enter your phone" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter your password" required/>
        </div>
        <button  className="text-white bg-green-400 p-2 rounded w-full border border-green-800 mt-4" type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup