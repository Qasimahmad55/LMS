import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
    item: any;
    isProfile?: boolean;
    key: number;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <Link
            href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
        >
            <div className="w-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-100 dark:border-slate-700/50 rounded-xl p-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Image
                    width={500}
                    height={300}
                    src={item.thumbnail?.url}
                    style={{ objectFit: "contain" }}
                    className="w-full h-[150px] object-cover rounded"
                    alt="thumbnail"
                />
                <h1 className="font-Poppins font-semibold text-[17px] text-slate-900 dark:text-white mt-2 line-clamp-2">
                    {item.name}
                </h1>
                <div className="w-full flex items-center justify-between pt-2">
                    <Ratings rating={item.ratings} />
                    <h5
                        className={`text-black dark:text-[#fff] ${isProfile && "hidden 800px:inline"
                            }`}
                    >
                        {item.purchased} Students
                    </h5>
                </div>
                <div className="w-full flex items-center justify-between pt-2">
                    <div className="flex">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg">
                            {item.price === 0 ? "Free" : item.price + "$"}
                        </h3>
                        <h5 className="pl-3 text-[14px] mt-1 line-through opacity-70 text-slate-500 dark:text-slate-400">
                            {item.estimatedPrice}$
                        </h5>
                    </div>
                    <div className="flex items-center">
                        <AiOutlineUnorderedList size={18} className="text-slate-600 dark:text-slate-400" />
                        <h5 className="pl-2 text-slate-600 dark:text-slate-400 text-[14px] font-medium">
                            {item.courseData?.length} Lectures
                        </h5>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;