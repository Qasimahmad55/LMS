"use client"
import { useGetUsersAllCoursesQuery } from '@/app/redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import CourseCard from '../Courses/CourseCard'

type Props = {}

const Courses = (props: Props) => {
    const { data, isLoading, refetch } = useGetUsersAllCoursesQuery({}, { refetchOnMountOrArgChange: true })
    // console.log(data);

    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        refetch();
        setCourses(data?.AllCourses);
    }, [data, refetch]);

    return (
        <div className="w-full pt-16 md:pt-24 pb-8 md:pb-12 bg-gray-50/50 dark:bg-slate-900/30">
            <div className={`w-[90%] md:w-[85%] lg:w-[80%] mx-auto`}>
                <h1 className="text-center font-Poppins text-[32px] sm:text-4xl lg:text-5xl dark:text-white text-slate-900 font-bold tracking-tight mb-4 leading-tight">
                    Expand Your Career <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Opportunity</span>
                    <br />
                    With Our Courses
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 font-Poppins mb-12 max-w-2xl mx-auto">
                    Choose from our wide range of premium courses and start building your future today.
                </p>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                    {courses &&
                        courses.map((item: any, index: number) => (
                            <CourseCard item={item} key={index} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Courses