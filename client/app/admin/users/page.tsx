'use client'
import DashBoardHero from '@/app/components/Admin/DashboardHero'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import AdminProtected from '@/app/hooks/AdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

const page = () => {
    return (
        <AdminProtected>
            <div>
                <Heading
                    title="Elearning - Admin"
                    description="Elearning is a platform for students to learn & get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <DashBoardHero isDashboard={false} />
                <AllUsers />
            </div>
        </AdminProtected>
    )
}

export default page