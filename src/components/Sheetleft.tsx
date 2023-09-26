import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { FaPlusSquare, FaTable } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { TbHomeDollar } from "react-icons/tb"

export function SheetLeft() {
    return (
        <div className="flex sm:hidden ">
            <Sheet >
                <SheetTrigger asChild>
                    <p className="text-2xl cursor-pointer"><HiOutlineMenuAlt3 /></p>
                </SheetTrigger>
                <SheetContent side="left" className="">
                    <div className="mb-[3rem]">

                        <SheetTitle >
                            <div className="h-[2rem]">

                            </div>
                        </SheetTitle>
                        <div className="logo border flex justify-center items-center h-fit p-2">
                            <h1 className="font-bold text-2xl  my-0 mx-auto">BenmaX</h1>
                        </div>
                        <div className="links flex flex-col gap-4 p-2 mt-4">
                            <div className="link">
                                <SheetClose asChild>
                                    <Link className="flex items-center gap-3 " href="/console"><span><p className="text-2xl"><TbHomeDollar /></p></span> Home </Link>
                                </SheetClose>
                            </div>
                            <div className="link">
                                <SheetClose asChild>

                                    <Link className="flex items-center gap-3 " href="/console/records"><span><p className="text-2xl"><FaTable /></p></span>Records</Link>
                                </SheetClose>
                            </div>
                            <div className="link">
                                <SheetClose asChild>
                                    <Link className="flex items-center gap-3 " href="/console/new-record"><span><p className="text-2xl"><FaPlusSquare /></p></span> New Record</Link>
                                </SheetClose>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

    )
}
