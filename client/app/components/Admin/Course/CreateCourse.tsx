'use client'
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import CourseData from './CourseData'
import { useCreateCourseMutation } from '@/app/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

type Props = {}

type CourseContentLink = {
    title: string
    url: string
}

type CourseContentItem = {
    videoUrl: string
    title: string
    description: string
    videoLength: string
    videoSection: string
    links: CourseContentLink[]
    suggestion?: string
}

const CreateCourse = (props: Props) => {
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation()
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        category: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])

    const [courseContentData, setCourseContentData] = useState<CourseContentItem[]>([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoLength: "",
            videoSection: "untitled Section",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);

    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course created Successfully")
            redirect("/admin/all-courses")
        } if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.message)

            }
        }
    }, [isLoading, isSuccess, error])

    const handleSubmit = () => {
        //format benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        //format prereqs
        const formattedPrerequesites = prerequisites.map((prereq) => ({ title: prereq.title }))
        //format course content
        const formattedCourseContentData = courseContentData.map(
            (courseContent) => ({
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoLength: courseContent.videoLength,
                videoSection: courseContent.videoSection,
                links: courseContent.links.map((link) => ({
                    title: link.title,
                    url: link.url,
                })),
                suggestion: courseContent.suggestion ?? "",
            })
        );
        //prepare our data project
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequesites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };


    const handleCourseCreate = async () => {
        const data = courseData
        if (!isLoading) {
            await createCourse(data)
        }
    };

    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="w-[20%] mt-[100px] h-full 800px:h-screen 800px:fixed  z-[-1]top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
            <div className="w-[100%] 800px:w-[80%]  ">
                {active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setPrerequisites={setPrerequisites}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={false}
                    />
                )}
            </div>
        </div>
    )
}
export default CreateCourse