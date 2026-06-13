"use client"
import DashBoardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/SideBar/AdminSidebar'
import EditFaq from '@/app/components/Admin/Customization/EditFaq'
import AdminProtected from '@/app/hooks/AdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux,AI/ML"
                />
                <div className="flex min-h-screen">
                    <div className="1500px:w-1/6 w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashBoardHero />
                        <EditFaq />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page