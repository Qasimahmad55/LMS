'use client'
import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import CourseData from './CourseData'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(2)
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

    const [courseContentData, setCourseContentData] = useState([
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