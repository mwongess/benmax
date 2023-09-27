"use client"

import { appwriteService } from "@/appwrite/config"
import { Models } from "appwrite"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { FaFolderPlus } from "react-icons/fa"

const NewMonthUsage = ({ params }: { params: { clientID: string } }) => {
    const [data, setData] = useState<Models.Document[]>([])
    const [error, setError] = useState('')
    const [consumedUnits, setConsumedUnits] = useState(0)
    const { clientID } = params

    const [formData, setFormData] = useState({
        initialReading: 0,
        finalReading: 0,
        clientID: clientID,
        month: "",
        paid: 0,
        consumedUnits: 0,
        caForward: 0,
        cumulativeTotal: 0
    })
    const router = useRouter()

    const costPerUnit = 30
    const total = consumedUnits * costPerUnit
    const balance = 0
    const caForward = 0
    const cumulativeTotal = 0



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
        const data = { ...formData, consumedUnits, total, balance, caForward, cumulativeTotal }
        try {
            appwriteService.createUsage(data)
            // clear form
            setFormData({
                initialReading: 0,
                finalReading: 0,
                clientID: " ",
                month: "",
                paid: 0,
                consumedUnits: 0,
                caForward: 0,
                cumulativeTotal: 0
            })
            // router.push('/console/records')
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="new-client">
            <h1 className="font-bold mb-2 border-b pb-2">New Month Usage</h1>
            <form onSubmit={handleSubmit} className="flex flex-col  gap-8 w-full">
                {
                    error &&
                    <div className="my-2 border-red-700 bg-red-400 text-red-700 rounded text-center p-4 font-bold">
                        <h1>{error}</h1>
                    </div>
                }
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Initial Reading</label>
                        <input type="number" value={formData.initialReading} onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                initialReading: e.target.value,
                            }))} name="initialReading"
                            placeholder="Meter Initial Reading" />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Final Reading</label>
                        <input type="number" value={formData.finalReading} onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                finalReading: e.target.value,
                            }))} name="Meter finalReading" placeholder="Meter Final Reading" required />
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="">Client ID</label>
                    <input type="text" value={clientID} onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            clientID: e.target.value,
                        }))} name="meter" placeholder="Client ID" required readOnly />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Billing Month</label>
                        <input type="text" onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                month: e.target.value,
                            }))} min={1} name="month" value={formData.month} placeholder="Billing Month" required />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Amount Paid</label>
                        <input type="number" onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                paid: e.target.value,
                            }))} value={formData.paid} name="paid" placeholder="Amount Paid" required />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 font-bold">
                    <p className="border-2 border-blue-800 p-2 rounded">Consumed Units : {consumedUnits}  </p>
                    <p className="border-2 border-blue-800 p-2 rounded">Cost per unit : Ksh {costPerUnit} </p>
                    <p className="border-2 border-blue-800 p-2 rounded">Total Bill : Ksh {total}</p>
                    <p className="border-2 border-blue-800 p-2 rounded">Balance : Ksh {balance}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 font-bold">
                    <p className="border-2 border-blue-800 p-2 rounded">Carried Forward : {caForward}  </p>
                    <p className="border-2 border-blue-800 p-2 rounded">Cumulative Bill : {cumulativeTotal}  </p>
                </div>
                <div>
                    <button type="submit" className="flex items-center gap-3 font-bold  justify-center bg-green-500 rounded p-2 w-1/4"><FaFolderPlus /> Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewMonthUsage