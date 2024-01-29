import Link from "next/link"
import {  FaTable } from "react-icons/fa";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { AiOutlineDashboard, AiOutlineMail, AiOutlineTable } from "react-icons/ai";
import { RiFileList2Line, RiGuideLine } from "react-icons/ri";
import {MdOutlineCalendarMonth } from "react-icons/md";
import { GiTap } from "react-icons/gi";

const SideNav = () => {
    return (
        <div className="text-slate-200">
            <div className="logo border border-slate-200 flex justify-center items-center h-fit p-2">
                <h1 className="flex items-center text-slate-100 font-bold text-2xl  my-0 mx-auto tracking-wider">Hydrat<span className="text-blue-600 text-3xl">8</span></h1>
            </div>
            <div className="links flex flex-col   mt-4">
                <div className="link  ">
                    <Link className="flex items-center gap-4" href="/console"><span><p className="text-2xl"><AiOutlineDashboard /></p></span> Dashboard</Link>
                </div>
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/clients"><span><p className="text-2xl"><MdOutlineCalendarMonth /></p></span>This Month</Link>
                </div>
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/clients"><span><p className="text-2xl"><FiUsers /></p></span>My Clients</Link>
                </div>
                {/* <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/clients/new"><span><p className="text-2xl"><FaPlusSquare /></p></span>New Client</Link>
                </div> */}
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/alltime-usage"><span><p className="text-2xl"><GiTap /></p></span>Alltime Usage</Link>
                </div>
                <div className="link border-t border-slate-300">
                    <Link className="flex items-center gap-4" href="/console/alltime-usage"><span><p className="text-2xl"><FiMessageSquare /></p></span>New Message</Link>
                </div>
                <div className="link ">
                    <Link className="flex items-center gap-4" href="/console/alltime-usage"><span><p className="text-2xl"><AiOutlineMail /></p></span>New Email</Link>
                </div>
                <div className="link border-t border-slate-300">
                    <Link className="flex items-center gap-4" href="/console/tips"><span><p className="text-2xl"><RiGuideLine /></p></span>Docs</Link>
                </div>
            </div>

        </div>
    )
}

export default SideNav