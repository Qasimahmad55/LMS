'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminProtected from '../hooks/AdminProtected'
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
                <DashBoardHero isDashboard={true} />
            </div>
        </AdminProtected>
    )
}

export default Page