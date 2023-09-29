"use client"

import { appwriteService } from "@/appwrite/config"
import { useAuth } from "@/context/authContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const Login = () => {
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { setAuthStatus } = useAuth()

  const router = useRouter()

  const login = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const session = await appwriteService.login(formData)
      if (session) {
        router.push("/console")
        setAuthStatus(true)
      }
    } catch (error: any) {
      setError(error.message)
    }

  }
  return (
    <div className="login flex  h-screen w-full">
      <div className="hidden sm:flex flex-col items-center justify-end h-full w-1/2 text-center p-4">
        <h1 className="font-bold text-6xl tracking-wider mb-6">BenmaX is Live</h1>
        <Image className="text-blue-500" src="/cloud.svg" height={150} width={480} alt="projection" />
      </div>
      <form className="flex flex-col justify-center items-center h-full w-full sm:w-1/2 bg-white text-black" onSubmit={login}>
        <div className="w-[75%]">
          {
            error &&
            <div className="error flex justify-center items-center p-4 my-5 rounded bg-red-400 border border-red-700 text-red-700">
              <h1 className="font-bold">{error}</h1>
            </div>
          }
          <div>
            <h1 className="font-bold text-3xl ">Sign in</h1>
          </div>

          <div className="my-5">
            <label htmlFor="username">Email*</label>
            <input type="email" value={formData.email} onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))} placeholder="Enter your email" />
          </div>

          <div>
            <label htmlFor="password">Password*</label>
            <input type="password" value={formData.password} onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }))} placeholder="Enter your password" />
          </div>
          <button className="text-white bg-blue-500 p-2 rounded w-full border-none mt-6" type="submit">Login</button>
        </div>

      </form>
    </div>
  )
}

export default Login