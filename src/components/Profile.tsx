"use client"

import {
    CreditCard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    PlusCircle,
    Settings,
    User,
    UserPlus,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { appwriteService } from "@/appwrite/config"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authContext"
import { FaRegUser } from "react-icons/fa"


const Profile = () => {
    const { setAuthStatus } = useAuth()
    const router = useRouter()
    const logout = () => {
        appwriteService.logout()
        setAuthStatus(false)
        router.push('/login')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className="flex gap-2 items-center cursor-pointer font-bold bg-blue-600 text-white rounded-full px-3 py-1"><FaRegUser /> My Account </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black rounded border border-gray-300">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span className="cursor-pointer">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span className="cursor-pointer">Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span className="cursor-pointer">Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub >
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span className="cursor-pointer">Invite Clients</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-black text-white rounded border border-gray-300">
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Support</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                    <span className="text-red-400 cursor-pointer" onClick={logout}>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile