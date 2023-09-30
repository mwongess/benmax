import Link from "next/link"
import { FaPlusSquare, FaTable } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiFileList2Line } from "react-icons/ri";

const SideNav = () => {
    return (
        <div className="text-slate-200">
            <div className="logo border border-gray-200 flex justify-center items-center h-fit p-2">
                <h1 className="flex items-center text-slate-100 font-bold text-2xl  my-0 mx-auto tracking-wider">Hydrat<span className="text-blue-600 text-3xl">8</span></h1>
            </div>
            <div className="links flex flex-col   mt-4">
                <div className="link  ">
                    <Link className="flex items-center gap-4" href="/console"><span><p className="text-2xl"><AiOutlineDashboard /></p></span> Dashboard</Link>
                </div>
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/clients"><span><p className="text-2xl"><FaTable /></p></span>All Clients</Link>
                </div>
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/clients/new"><span><p className="text-2xl"><FaPlusSquare /></p></span>New Client</Link>
                </div>
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/alltime-usage"><span><p className="text-2xl"><RiFileList2Line /></p></span>Alltime Usage</Link>
                </div>
            </div>

        </div>
    )
}

export default SideNav