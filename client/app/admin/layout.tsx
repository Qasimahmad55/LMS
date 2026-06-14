import React from "react";
import AdminSidebar from "@/app/components/Admin/SideBar/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
                {children}
            </div>
        </div>
    );
}
