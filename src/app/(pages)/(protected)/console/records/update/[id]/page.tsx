"use client"

import { appwriteService } from "@/appwrite/config"
import { Models } from "appwrite"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

const UpdateRecord = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Models.Document[]>([])
  const [error, setError] = useState('')
  const [consumedUnits, setConsumedUnits] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    meter: "",
    initialReading: "",
    finalReading: "",
  })
  const { id } = params
  const router = useRouter()
  const costPerUnit = 30
  const totalBill = consumedUnits * costPerUnit
  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    if (data[0]) {

      setFormData({
        name: data[0].name,
        phone: data[0].phone,
        meter: data[0].meter,
        initialReading: data[0].initialReading,
        finalReading: data[0].finalReading,
      })
    }
  }, [data])
  
  const fetchClients = async () => {
    try {
      const { documents } = await appwriteService.getClients()
      setData(documents.filter((document) => document.$id === id))
    } catch (error: any) {
      setError(error.message)
    }
  }
  useEffect(() => {
    if (Number(formData.finalReading) >= Number(formData.initialReading)) {
      setConsumedUnits(Number(formData.finalReading) - Number(formData.initialReading))
    } else {
      setConsumedUnits(0)
    }
  }, [formData])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formData.finalReading < formData.initialReading) {
      setError('Final reading cannot be less than initial reading!')
      return
    }
    const data = { ...formData, consumedUnits, totalBill }
    try {
      appwriteService.updateClient(id, data)
      // clear form
      setFormData({
        name: "",
        phone: "",
        meter: "",
        initialReading: "",
        finalReading: "",
      })
      router.push('/console/records')
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="new-client">
      <h1 className="font-bold mb-2 border-b pb-2">Update Customer Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-8 w-full">
        {
          error &&
          <div className="my-2 border-red-700 bg-red-400 text-red-700 rounded text-center p-4 font-bold">
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
              }))} name="phone" placeholder="Client phone number" required />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="">Meter Number</label>
          <input type="text" value={formData.meter} onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              meter: e.target.value,
            }))} name="meter" placeholder="Client meter number" required readOnly />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Initial Units</label>
            <input type="number" onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                initialReading: e.target.value,
              }))} min={1} name="initialReading" value={formData.initialReading} placeholder="Initial Units" required />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Final Units</label>
            <input type="number" onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                finalReading: e.target.value,
              }))} value={formData.finalReading} min={formData.initialReading} name="finalReading" placeholder="Final Units" required />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 font-bold">
          <p className="border-2 border-blue-800 p-2 rounded">Consumed Units : {consumedUnits}  </p>
          <p className="border-2 border-blue-800 p-2 rounded">Cost per units : Ksh {costPerUnit} </p>
          <p className="border-2 border-blue-800 p-2 rounded">Total Cost : Ksh {totalBill}</p>
        </div>
        <div>
          <button type="submit" className="bg-green-500 rounded p-2 w-full">Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateRecord