'use client'
import React, { useState } from "react";
import AdminSidebar from "@/app/components/Admin/SideBar/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#0F172A]">
            <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div 
                className="transition-all duration-300 flex-1 min-w-0 overflow-hidden"
                style={{ marginLeft: isCollapsed ? "80px" : "270px" }}
            >
                {children}
            </div>
        </div>
    );
}
