'use client'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/SideBar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import React from 'react'


const Page = () => {
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
                    <CreateCourse />
                </div>
            </div>
        </div>
    )
}

export default Page;