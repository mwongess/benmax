"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { AiOutlineDashboard, AiOutlineMail } from "react-icons/ai";
import { GiTap } from "react-icons/gi";
const SideNav = () => {
    const [isConsolePage, setIsConsolePage] = useState(false);

    useEffect(() => {
        const urlContainsConsole = window.location.href.includes("console");
        setIsConsolePage(urlContainsConsole);
    }, []);

    const consoleLinks = [
        { href: "/console", text: "Dashboard", icon: AiOutlineDashboard },
        { href: "/console/clients", text: "My Clients", icon: FiUsers },
        { href: "/console/alltime-usage", text: "Alltime Usage", icon: GiTap },
        // { href: "/console/message", text: "New Message", icon: FiMessageSquare }

    ];

    const userLinks = [
        { href: "/", text: "Dashboard", icon: AiOutlineDashboard },
        // { href: "/user/messages", text: "Messages", icon: FiMessageSquare }
        { href: "/user/pay", text: "Pay", icon: FiMessageSquare }
    ];

    return (
        <div className="text-slate-200">
            <div className="logo border border-slate-200 flex justify-center items-center h-fit p-2">
                <h1 className="flex items-center text-slate-100 font-bold text-2xl  my-0 mx-auto tracking-wider">Hydrat<span className="text-blue-600 text-3xl">8</span></h1>
            </div>
            <div className="links flex flex-col   mt-4">
                {isConsolePage ?
                    consoleLinks.map((link, index) => (
                        <div className="link" key={index}>
                            <Link href={link.href} passHref className="flex items-center gap-4">
                                <span><p className="text-2xl">{<link.icon />}</p></span> {link.text}
                            </Link>
                        </div>
                    )) :
                    userLinks.map((link, index) => (
                        <div className="link" key={index}>
                            <Link href={link.href} passHref className="flex items-center gap-4">
                                <span><p className="text-2xl">{<link.icon />}</p></span> {link.text}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SideNav;
