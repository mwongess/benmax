"use client"

import { appwriteService } from "@/appwrite/config"
import { toast } from "@/components/ui/use-toast"
import { Models } from "appwrite"
import { FormEvent, useEffect, useState } from "react"
import { FaFolderPlus } from "react-icons/fa"

const NewMonthUsage = ({ params }: { params: { clientID: string } }) => {
    const [error, setError] = useState('')
    const [consumedUnits, setConsumedUnits] = useState(0)
    const [initialReading, setInitialReading] = useState(0)
    const [caForward, setCaForward] = useState(0)
    const { clientID } = params

    const [formData, setFormData] = useState({
        finalReading: 0,
        clientID: clientID,
        month: "",
        paid: 0,
        consumedUnits: 0,
        cumulativeTotal: 0
    })

    const costPerUnit = 30
    const total = consumedUnits * costPerUnit
    const balance = total - formData.paid 
    const cumulativeTotal = balance + caForward

    useEffect(() => {
        getCarForward()
    }, [])

    const getCarForward = async () => {
        try {
            const { documents } = await appwriteService.getUsage()
            const thisUserData = documents.filter((document) => document.clientID === clientID)
            if (thisUserData[0]) {
                setCaForward(thisUserData[0].cumulativeTotal)
                setInitialReading(thisUserData[0].initialReading)
            } else {
                setCaForward(0)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (Number(formData.finalReading) >= Number(initialReading)) {
            setConsumedUnits(Number(formData.finalReading) - Number(initialReading))
        } else {
            setConsumedUnits(0)
        }
    }, [formData])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (formData.finalReading < initialReading) {
            setError('Final reading cannot be less than initial reading!')
            return
        }
        const data = { ...formData, consumedUnits, total, balance, caForward, cumulativeTotal }
        try {
            const response = await appwriteService.createUsage(data)
            console.log(response);

            if (response) {
                toast({
                    title: "Record has been saved successfuly.",
                    description: `${response.$createdAt}`,
                })
            }
            // clear form
            setFormData({
                finalReading: 0,
                clientID: " ",
                month: "",
                paid: 0,
                consumedUnits: 0,
                cumulativeTotal: 0
            })
            // router.push('/console/records')
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="new-client">
            <div className="flex justify-between  mb-2 border-b  pb-2">
                <h1 className="font-bold ">New Month Usage</h1>
                {/* <button className="flex items-center gap-3 font-bold  justify-center bg-slate-400 rounded p-2 w-[15%]">Go Back</button> */}

            </div>
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
                        <input type="number" value={initialReading} onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                initialReading: Number(e.target.value),
                            }))} name="initialReading" readOnly disabled
                            placeholder="Meter Initial Reading" />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Final Reading</label>
                        <input type="number" value={formData.finalReading} onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                finalReading: Number(e.target.value),
                            }))} name="Meter finalReading" placeholder="Meter Final Reading" required />
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="">Client ID</label>
                    <input type="text" value={clientID} onChange={(e) =>
                        setFormData((prev: any) => ({
                            ...prev,
                            clientID: e.target.value,
                        }))} name="meter" placeholder="Client ID" required readOnly disabled />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Billing Month</label>
                        <input type="text" onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                month: e.target.value,
                            }))} min={1} name="month" value={formData.month} placeholder="Billing Month" required />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Amount Paid</label>
                        <input type="number" onChange={(e) =>
                            setFormData((prev: any) => ({
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
                <div className="flex  gap-4">
                    <button type="submit" className="flex items-center gap-3 font-bold  justify-center bg-green-500 rounded p-2  w-1/4"><FaFolderPlus /> Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewMonthUsage