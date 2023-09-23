"use client"

import { FormEvent } from "react"

const page = () => {
  const login = (e: FormEvent)=> {
    e.preventDefault()
    console.log("Submitted");
    
  }
  return (
    <div className="login flex justify-center items-center  h-screen">
      <form  onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input  type="text" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button  className="text-white bg-green-400 p-2 rounded w-full border border-green-800 mt-4" type="submit">Login</button>
      </form>
    </div>
  )
}

export default page