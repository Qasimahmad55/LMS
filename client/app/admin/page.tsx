'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminProtected from '../hooks/AdminProtected'
import AdminSidebar from '../components/Admin/SideBar/AdminSidebar'
import DashBoardHero from '../components/Admin/DashboardHero'

const Page = () => {
    return (
        <AdminProtected>
            <div>
                <Heading
                    title="Elearning - Admin"
                    description="Elearning is a platform for students to learn & get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className='flex h-[200vh]'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]'>
                        <DashBoardHero isDashboard={true} />
                    </div>
                </div>
            </div>
        </AdminProtected>
    )
}

export default Page