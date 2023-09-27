import Link from "next/link"
import { FaPlusSquare, FaTable } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";

const SideNav = () => {
    return (
        <div>
            <div className="logo border flex justify-center items-center h-fit p-2">
                <h1 className="font-bold text-2xl  my-0 mx-auto">BenmaX</h1>
            </div>
            <div className="links flex flex-col gap-4 p-2 mt-4">
                <div className="link">
                    <Link className="flex items-center gap-3 " href="/console"><span><p className="text-2xl"><AiOutlineDashboard /></p></span> Dashboard</Link>
                </div>
                <div className="link">
                    <Link className="flex items-center gap-3 " href="/console/clients"><span><p className="text-2xl"><FaTable /></p></span>All Clients</Link>
                </div>
                <div className="link">
                    <Link className="flex items-center gap-3 " href="/console/clients/new"><span><p className="text-2xl"><FaPlusSquare /></p></span>New Client</Link>
                </div>
            </div>

        </div>
    )
}

export default SideNav