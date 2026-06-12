'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses'
import DashBoardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/SideBar/AdminSidebar'
import AdminProtected from '@/app/hooks/AdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <AdminProtected>
            <div>
                <Heading
                    title="Elearning - Admin"
                    description="Elearning is a platform for students to learn & get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className='flex h-screen'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]'>
                        <DashBoardHero isDashboard={true} />
                        <AllCourses/>
                    </div>
                </div>
            </div>
        </AdminProtected>
    )
}

export default page