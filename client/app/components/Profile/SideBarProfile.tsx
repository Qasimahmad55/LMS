import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import avatardefault from '../../../public/assets/avatar.png'
import { useSession } from 'next-auth/react';

type Props = {
    user: any
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: () => Promise<void>;
}

const SideBarProfile = ({ user, active, avatar, setActive, logoutHandler }: Props) => {
    const { data } = useSession();
    return (
        <>
            <div className='w-full'>
                <div
                    className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                        }`}
                    onClick={() => setActive(1)}
                >
                    <Image
                        src={user.avatar?.url ||
                            user.avatar ||
                            data?.user?.image ||
                            avatardefault}
                        alt=''
                        width={50}
                        height={50}
                        className="w-[30px] h-[30px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
                    />
                    <h5
                        className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                        My Account
                    </h5>
                </div>
                <div
                    className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                        }`}
                    onClick={() => setActive(2)}
                >
                    <RiLockPasswordLine size={20} className="dark:text-white text-black" />
                    <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                        Change Password
                    </h5>
                </div>
                <div
                    className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
                        }`}
                    onClick={() => setActive(3)}
                >
                    <SiCoursera size={20} className="dark:text-white text-black" />
                    <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                        Enrolled Courses
                    </h5>
                </div>
                {
                    user.role === "admin" &&
                    <Link

                        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
                            }`}
                        href={"/admin"}
                    >

                        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black" />
                        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                            Admin Dashboard
                        </h5>

                    </Link>
                }
                <div
                    className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
                        }`}
                    onClick={() => logoutHandler()}
                >
                    <BiLogOutCircle size={20} className="dark:text-white text-black" />
                    <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                        Logout
                    </h5>
                </div>
            </div>
        </>
    )
}

export default SideBarProfile