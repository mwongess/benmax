import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { AiOutlineDashboard } from "react-icons/ai"
import { FaPlusSquare, FaTable } from "react-icons/fa"
import { HiOutlineMenuAlt2 } from "react-icons/hi"
import { RiFileList2Line } from "react-icons/ri"

export function SheetLeft() {
    return (
        <div className="flex sm:hidden ">
            <Sheet >
                <SheetTrigger asChild>
                    <p className="text-2xl cursor-pointer"><HiOutlineMenuAlt2 /></p>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black border-none">
                    <div >
                        <div className="links flex flex-col gap-4 p-2 ">
                            <div className="link">
                                <SheetClose asChild>
                                    <Link className="flex items-center gap-3 text-lg" href="/console"><span><p className="text-2xl"><AiOutlineDashboard /></p></span> Dashboard</Link>
                                </SheetClose>
                            </div>

                            <div className="link">
                                <SheetClose asChild>
                                    <Link className="flex items-center gap-3 " href="/console/clients"><span><p className="text-2xl"><FaTable /></p></span>All Clients</Link>
                                </SheetClose>
                            </div>

                            <div className="link">
                                <SheetClose asChild>
                                    <Link className="flex items-center gap-3 " href="/console/clients/new"><span><p className="text-2xl"><FaPlusSquare /></p></span>New Client</Link>
                                </SheetClose>
                            </div>

                            <div className="link">
                                <SheetClose asChild>
                                    <Link className="flex items-center gap-3 " href="/console/alltime-usage"><span><p className="text-2xl"><RiFileList2Line /></p></span>Alltime Usage</Link>
                                </SheetClose>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

    )
}
