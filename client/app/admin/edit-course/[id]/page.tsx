'use client'
import EditCourse from '@/app/components/Admin/Course/EditCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/SideBar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import React, { use } from 'react'


const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    return (
        <div>
            <Heading
                title='Elearning - Admin'
                description='Elearning is best'
                keywords='Progamming, MERN, Maching Learning' />
            <div className='flex'>
                <div className='1500px:w-[15%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[80%]'>
                    <DashboardHeader />
                    <EditCourse id={id} />
                </div>
            </div>
        </div>
    )
}

export default Page;