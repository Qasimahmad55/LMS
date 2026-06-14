"use client"
import DashBoardHero from '@/app/components/Admin/DashboardHero'
import EditHero from '@/app/components/Admin/Customization/EditHero'
import AdminProtected from '@/app/hooks/AdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="Elearning - Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming,MERN,Redux,Machine Learning"
                />
                <DashBoardHero />
                <EditHero />
            </AdminProtected>
        </div>
    )
}

export default page