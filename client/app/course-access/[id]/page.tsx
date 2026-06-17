'use client'
import CourseContent from '@/app/components/Courses/CourseConent'
import Footer from '@/app/components/Footer'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/app/redux/features/api/apiSlice'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {

    const params = useParams();

    const id = params?.id as string;

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased =
                data && data.user.courses.find((item: any) => item.courseId === id);
            if (!isPurchased) {
                redirect("/");
            }
        }
        if (error) {
            redirect("/");
        }
    }, [data, error, id, isLoading]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data?.user} />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default page