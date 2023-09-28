"use client"

import { appwriteService } from "@/appwrite/config"
import { useToast } from "@/components/ui/use-toast"
import { Models } from "appwrite"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { FaFolderPlus } from "react-icons/fa"

const UpdateClient = ({ params }: { params: { clientID: string } }) => {
  const [client, setClient] = useState<Models.Document[]>([])
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    meter: "",
  })
  const { toast } = useToast()
  const { clientID } = params
  const router = useRouter()
  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const client = await appwriteService.getClient(clientID)
      setFormData({
        name: client.name,
        phone: client.phone,
        meter: client.meter
      })
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (formData.phone.startsWith("+254")) {

        const response = await appwriteService.updateClient(clientID, formData)
        // clear form
        

        if (response) {
          console.log(response);
          
          toast({
            title: "Client Details Updated Successfuly ",
            description: `${response.$updatedAt}`,
          })
          // router.push('/console/clients')
        }

        // setFormData({
        //   name: "",
        //   phone: "",
        //   meter: "",
        // })
      } else {
        setError('Phone Number must start with +254')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="new-client">
      <h1 className="font-bold mb-2 border-b pb-2">Update Existing Client</h1>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-8 w-full">
        {
          error &&
          <div className="my-2 border-red-700 bg-red-200 text-red-700 rounded text-center p-4 font-bold">
            <h1>{error}</h1>
          </div>
        }
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Name</label>
            <input type="text" value={formData.name} onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))} name="name"
              placeholder="Client Name" />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Phone</label>
            <input type="text" value={formData.phone} onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))} name="phone" placeholder="Client phone number (+254)" required />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="">Meter Number</label>
          <input type="text" value={formData.meter} onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              meter: e.target.value,
            }))} name="meter" placeholder="Client meter number" readOnly required />
        </div>

        <div>
          <button type="submit" className="flex items-center gap-3 font-bold  justify-center bg-green-500 rounded p-2 w-1/4"><FaFolderPlus /> Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateClient