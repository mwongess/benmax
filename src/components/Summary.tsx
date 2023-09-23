import { BsStickies } from "react-icons/bs";
import { FaDollarSign, FaRegMoneyBillAlt, FaUsers, } from "react-icons/fa";
const Summary = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#407B61]">
                <p className="text-4xl"><FaUsers /></p>
                <div className="text-center">
                    <p>Total Clients</p>
                    <p className="font-bold text-3xl">5</p>
                </div>
            </div>
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#880044AB]">
                <p className="text-4xl"><FaDollarSign /></p>
                <div className="text-center">
                    <p>Total Bill</p>
                    <p className="font-bold text-3xl">89</p>
                </div>
            </div>
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#AE7505]">
                <p className="text-4xl"><FaRegMoneyBillAlt /></p>
                <div className="text-center">
                    <p>Pending Bills</p>
                    <p className="font-bold text-3xl">78</p>
                </div>
            </div>
            <div className="w-full flex  justify-between  h-[20vh] p-3 bg-[#d32d41]">
                <p className="text-4xl"><BsStickies /></p>
                <div className="text-center">
                    <p className="">Cleared Bills</p>
                    <p className="font-bold text-3xl">5</p>
                </div>
            </div>
        </div>
    )
}

export default Summary