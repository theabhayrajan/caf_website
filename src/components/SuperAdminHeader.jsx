import React from 'react'
import Image from 'next/image';
import { User, MoreVertical, Globe, Menu, X, ChevronLeft } from "lucide-react";
import { useState } from 'react';

function SuperAdminHeader() {

    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <div className="bg-black text-white">
            <div className="flex items-center justify-between px-4 md:px-6 h-16 max-w-7xl mx-auto 2xl:max-w-none 2xl:mx-0 2xl:px-20">
                {/* Left: Logo + Name */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="CAF Logo"
                        width={50}
                        height={50}
                        className="object-contain rounded-sm"
                    />
                    <span className="font-bold text-sm sm:text-md leading-none hidden sm:inline">
                        Cognitive Alliance Forumz (CAF)
                    </span>
                    <span className="font-medium text-[1.1rem] sm:hidden">CAF</span>
                </div>

                {/* Right: Greeting + Icons + Hamburger */}
                <div className="flex items-center gap-3 text-xs sm:text-base 2xl:text-[1.05rem]">
                    <span className="whitespace-nowrap hidden sm:inline mr-2">
                        Hi Super Admin
                    </span>
                    <User className="w-5.5 h-5.5 lg:w-6 lg:h-6" />
                    <MoreVertical className="w-5 h-5 lg:w-6 lg:h-6 hidden sm:flex" />
                </div>
            </div>
        </div>

    )
}

export default SuperAdminHeader
