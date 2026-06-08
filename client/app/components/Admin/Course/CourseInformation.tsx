'use client'
import { styles } from '@/app/styles/styles'
import React, { useState } from 'react'

type Props = {
    courseInfo: any,
    setCourseInfo: (courseInfo: any) => void,
    active: number,
    setActive: (active: number) => void
}

const CourseInformation = ({ courseInfo, setCourseInfo, active, setActive }: Props) => {
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const fileReader = new FileReader
            fileReader.onload = (e: any) => {
                if (fileReader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: fileReader.result })
                }
            }
            fileReader.readAsDataURL(file)
        }
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDragOver = (e: any) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        setDragging(false)

        const file = e.dataTransfer.files?.[0]

        if (file) {
            const fileReader = new FileReader
            fileReader.onload = (e: any) => {
                if (fileReader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: fileReader.result })
                }
            }
            fileReader.readAsDataURL(file)
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                <div>
                    <label htmlFor=''>
                        Course Name
                    </label>
                    <input
                        type='name'
                        name=''
                        required
                        value={courseInfo.name}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        id='name'
                        placeholder='MERN stack LMS platform with nextjs'
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                <div className='mb-5'>
                    <label className={`${styles.label}`}>
                        Course Description
                    </label>
                    <textarea name="" id="" cols={30} rows={8}
                        placeholder='Write Something amazing...'
                        className={`${styles.input} !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}></textarea>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>
                            Course Price
                        </label>
                        <input
                            type='number'
                            name=''
                            required
                            value={courseInfo.price}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            id='price'
                            placeholder='29'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label className={`${styles.label}`}>
                            {"Estimated Price"}
                        </label>
                        <input
                            type='number'
                            name=''
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            id='price'
                            placeholder='79'
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`} htmlFor="email">
                            Course Tags
                        </label>
                        <input
                            type="text"
                            required
                            name=""
                            value={courseInfo.tags}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, tags: e.target.value })
                            }
                            id="tags"
                            placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
                            className={`
            ${styles.input}`}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label className={`${styles.label} w-[50%]`}>
                            Course Categories
                        </label>
                        <select
                            name=""
                            id=""
                            className="w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                            value={courseInfo.category}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, category: e.target.value })
                            }
                        >
                            <option className="bg-[#1c2024]" value="">
                                Select Category
                            </option>
                            {categories &&
                                categories?.map((item: any) => (
                                    <option
                                        className="bg-[#1c2024]"
                                        value={item.title}
                                        key={item._id}
                                    >
                                        {item.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Course Level</label>
                        <input
                            type="text"
                            name=""
                            value={courseInfo.level}
                            required
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            id="level"
                            placeholder="Beginner/Intermediate/Expert"
                            className={`
            ${styles.input}`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className={`${styles.label} w-[50%]`}>Demo Url</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            id="demoUrl"
                            placeholder="eer74fd"
                            className={`
            ${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <img
                                src={courseInfo.thumbnail}
                                alt=""
                                className="max-h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-black dark:text-white">
                                Drag and drop your thumbnail here or click to browse
                            </span>
                        )}
                    </label>
                </div>
                <br />
                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    />
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default CourseInformation