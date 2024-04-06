"use client"

import { appwriteService } from "@/appwrite/config"
import { Models } from "appwrite"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { FaFolderPlus } from "react-icons/fa"

const NewClient = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<Models.Document[]>([])
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        meter: "",
    })

    const router = useRouter()
    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            const { documents } = await appwriteService.getClients()
            setData(documents)
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            if (formData.phone.startsWith("+254")) {
                if ((data.filter(client => client.meter === formData.meter))[0]) {
                    setError("A client with this meter number already exists!")
                } else {

                    const response = await appwriteService.createClient(formData)

                    // clear form
                    setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        meter: "",
                    })

                    if (response) {
                        router.push('/console/clients')
                    }
                }
            } else {
                setError('Phone Number must start with +254')
            }
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="new-client">
            <h1 className="font-bold mb-2 border-b pb-2">Create New Client</h1>
            <form onSubmit={handleSubmit} className="flex flex-col  gap-8 w-full text-white">
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
                <div className="w-full sm:w-1/2 flex flex-col">
                        <label htmlFor="">Email</label>
                        <input type="email" value={formData.email} onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))} name="email"
                            placeholder="Client Email" required/>
                    </div>
                <div className="w-fit flex flex-col">
                    <label htmlFor="">Meter Number</label>
                    <input type="text" value={formData.meter} onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            meter: e.target.value,
                        }))} name="meter" placeholder="Client meter number" required />
                </div>

                <div>
                    <button type="submit" className="flex items-center gap-3 font-bold  justify-center bg-green-500 rounded p-2 w-1/4"><FaFolderPlus /> Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewClient