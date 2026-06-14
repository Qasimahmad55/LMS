'use client'
import EditCourse from '@/app/components/Admin/Course/EditCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
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
            <DashboardHeader />
            <EditCourse id={id} />
        </div>
    )
}

export default Page;