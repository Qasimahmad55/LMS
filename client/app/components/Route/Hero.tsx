"use client"

// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"
import Image from "next/image"
import heroBanner from "../../../public/assets/hero-banner-1.png"
import client1 from "../../../public/assets/client-1.jpg"
import client2 from "../../../public/assets/client-2.jpg"
import client3 from "../../../public/assets/client-3.jpg"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useGetHeroDataQuery } from "@/app/redux/features/layout/layoutApi"
import Loader from "../Loader/Loader"
// import Loader from "../Loader/Loader"

const Hero = () => {

    const { data, isLoading } = useGetHeroDataQuery("Banner", {})
    // console.log(data);
    const [search, setSearch] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (search === "") {
            return
        } else {
            router.push(`/courses?title=${search}`)
        }
    }


    return (
        <>
            {
                isLoading ?
                    (<Loader />)
                    :
                    (
                        <div className="w-full min-h-[90vh] flex flex-col md:flex-row-reverse items-center justify-between px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
                            <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 animate-fade-in">
                                <div className="relative w-full max-w-[300px] sm:max-w-md md:max-w-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full filter blur-3xl opacity-40 md:opacity-70 animate-float"></div>
                                    <Image
                                        src={data?.layout?.banner?.image?.url || heroBanner}
                                        width={1000}
                                        height={1000}
                                        alt="Hero illustration"
                                        className="relative z-10 w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-12 md:mt-0 animate-slide-up">
                                <h1 className="dark:text-white text-slate-900 text-4xl sm:text-5xl lg:text-[64px] font-bold font-Poppins py-2 leading-tight tracking-tight">
                                    {data?.layout?.banner?.title || "Improve Your Online Learning Experience Instantly"}
                                </h1>
                                <p className="dark:text-slate-300 text-slate-600 font-Poppins font-medium text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed">
                                    {data?.layout?.banner?.subTitle || "Discover a world of knowledge at your fingertips. Join our community of learners and unlock your potential today."}
                                </p>

                                <div className="w-full max-w-xl mt-10 relative bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-100 dark:border-slate-700 flex overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
                                    <input
                                        type="search"
                                        placeholder="Search Courses..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="flex-1 bg-transparent p-4 outline-none text-slate-700 dark:text-slate-200 text-lg font-Poppins"
                                    />
                                    <button
                                        className="w-[60px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors"
                                        onClick={handleSearch}
                                        aria-label="Search"
                                    >
                                        <BiSearch className="text-white" size={24} />
                                    </button>
                                </div>
                                
                                <div className="mt-12 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <div className="flex -space-x-4">
                                        <Image
                                            src={client1}
                                            width={50}
                                            height={50}
                                            alt="Student"
                                            className="rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                                        />
                                        <Image
                                            src={client2}
                                            width={50}
                                            height={50}
                                            alt="Student"
                                            className="rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                                        />
                                        <Image
                                            src={client3}
                                            width={50}
                                            height={50}
                                            alt="Student"
                                            className="rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                                        />
                                    </div>
                                    <p className="font-Poppins dark:text-slate-300 text-slate-600 text-lg font-medium">
                                        500K+ People already trusted us.{" "}
                                        <Link
                                            href="/courses"
                                            className="dark:text-blue-400 text-blue-600 hover:underline font-semibold"
                                        >
                                            View Courses
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    );
};

export default Hero
