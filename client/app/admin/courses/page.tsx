'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses'
import DashBoardHero from '@/app/components/Admin/DashboardHero'
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
                <DashBoardHero isDashboard={false} />
                <AllCourses />
            </div>
        </AdminProtected>
    )
}

export default page