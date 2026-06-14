"use client"
import DashBoardHero from '@/app/components/Admin/DashboardHero'
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
                <DashBoardHero />
                <EditFaq />
            </AdminProtected>
        </div>
    )
}

export default page