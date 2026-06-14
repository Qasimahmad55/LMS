'use client'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import Heading from '@/app/utils/Heading';
import React from 'react'


const Page = () => {
    return (
        <div>
            <Heading
                title='Elearning - Admin'
                description='Elearning is best'
                keywords='Progamming, MERN, Maching Learning' />
            <DashboardHeader />
            <CreateCourse />
        </div>
    )
}

export default Page;