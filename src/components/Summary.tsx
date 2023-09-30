"use client"
import { BsStickies } from "react-icons/bs";
import { FaDollarSign, FaRegMoneyBillAlt, FaUsers, } from "react-icons/fa";
import { appwriteService } from "@/appwrite/config";
import { useEffect, useState } from "react";
const Summary = () => {
    const [users, setUsers] = useState(0)
    const [bills, setBills] = useState(0)
    const [usersWithNoBalance, setUsesWithNoBlalance] = useState(0)
    const [pendingBills, setPendingBills] = useState(0)
    const getData = async () => {
        const data = await appwriteService.getClients()
        const bills = await appwriteService.getUsage()
        const allBills = bills.documents;

        const resp = data.documents
        setUsers(resp.length)
        const totalAmounting = allBills.reduce((sum, user) => sum + user.total, 0);
        setBills(totalAmounting)

        let usersWithNegativeBalance = 0;

        allBills.forEach(item => {
            if (item.balance <= 0) {
                usersWithNegativeBalance++;
            }
        });
        setUsesWithNoBlalance(usersWithNegativeBalance)

        const pendingBills = users - usersWithNoBalance
        setPendingBills(pendingBills)



    }
    useEffect(() => {
        getData()
    })
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#407B61]">
                <p className="text-4xl"><FaUsers /></p>
                <div className="text-center">
                    <p>Total Clients</p>
                    <p className="font-bold text-3xl">{users}</p>
                </div>
            </div>
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#880044AB]">
                <p className="text-4xl"><FaDollarSign /></p>
                <div className="text-center">
                    <p>Total Bill</p>
                    <p className="font-bold text-3xl">{bills}</p>
                </div>
            </div>
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#AE7505]">
                <p className="text-4xl"><FaRegMoneyBillAlt /></p>
                <div className="text-center">
                    <p>Pending Bills</p>
                    <p className="font-bold text-3xl">{pendingBills}</p>
                </div>
            </div>
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#d32d41]">
                <p className="text-4xl"><BsStickies /></p>
                <div className="text-center">
                    <p className="">Cleared Bills</p>
                    <p className="font-bold text-3xl">{usersWithNoBalance}</p>
                </div>
            </div>
        </div>
    )
}

export default Summary