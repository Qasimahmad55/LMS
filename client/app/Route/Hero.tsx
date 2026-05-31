"use client"

// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, useState } from "react"
import { BiSearch } from "react-icons/bi"
// import Loader from "../Loader/Loader"



const Hero = () => {
    const [search, setSearch] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (search !== "") {
            router.push(`/courses?title=${search}`)
        }
    }

    const { data, isLoading } = useGetHeroDataQuery("Banner", {});
    if (data)
        console.log(data);

    return (
        <>
            {

                isLoading ? (
                    <Loader />
                ) : (

                    <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row-reverse items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
                        <div className="w-1/2 lg:w-[40%] flex justify-center items-center order-2 lg:order-1 mt-8 lg:mt-0">
                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
                                <Image
                                    src={data?.layout?.banner?.image?.url || "/assests/Saly-1.png"}
                                    width={5000}
                                    height={5000}
                                    alt="Hero illustration"
                                    className="relative z-10 w-full h-auto object-contain hover:scale-105 transition-transform duration-300 hover-anim"
                                />
                            </div>
                        </div>

                        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                            <h1 className="dark:text-white text-[#000000c7] text-[40px] px-3 w-full 1000px:text-[60px] font-[600] font-Josefin pl-[105px] py-2 1000px:leading-[75px] 1500px:w-[80%] 1100px:w-[78%]">
                                {data?.layout?.banner?.title || "Improve Your Online Learning Experience Instantly"}
                            </h1>
                            <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
                                {data?.layout?.banner?.subTitle || "Discover a world of knowledge at your fingertips. Join our community of learners and unlock your potential today."}
                            </p>

                            <br />
                            <br />
                            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                                <input
                                    type="search"
                                    placeholder="Search Courses..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                                />
                                <div
                                    className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                                    onClick={handleSearch}
                                >
                                    <BiSearch className="text-white" size={30} />
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
                                <Image
                                    src="/assests/hero.jpg"
                                    width={50}
                                    height={50}
                                    alt=""
                                    className="rounded-full"
                                />
                                <Image
                                    src="/assests/hero.jpg"
                                    width={50}
                                    height={50}
                                    alt=""
                                    className="rounded-full ml-[-20px]"
                                />
                                <Image
                                    src="/assests/hero.jpg"
                                    width={50}
                                    height={50}
                                    alt=""
                                    className="rounded-full ml-[-20px]"
                                />
                                <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                                    500K+ People already trusted us.{" "}
                                    <Link
                                        href="/courses"
                                        className="dark:text-[#46e256] text-[crimson]"
                                    >
                                        View Courses
                                    </Link>{" "}
                                </p>
                            </div>
                            <br />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Hero
