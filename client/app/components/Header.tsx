'use client'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import NavItems from '../utils/NavItems'
import ThemeSwitcher from './ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'
import CustomModal from '../utils/CustomModal'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Verification from './Auth/Verification'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import avatar from '../../public/assets/avatar.png'
import { useSession } from 'next-auth/react'
import { useSocialAuthMutation } from '../redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { useLoadUserQuery } from '../redux/features/api/apiSlice'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number,
    route: string,
    setRoute: (route: string) => void
}


const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
    const { user } = useSelector((state: any) => state.auth)
    const { data } = useSession()
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
    const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {})
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [logout, SetLogOut] = useState(false);
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        if (!userData) {
            if (data) {
                socialAuth({
                    email: data?.user?.email,
                    name: data?.user?.name,
                    avatar: data?.user?.image,
                });
                refetch();
            }
        }
        if (data === null && isSuccess) {
            toast.success("Login Successfully");
        }
        if (data === null && !isLoading && !userData) {
            SetLogOut(true)
        }
    }, [data, isLoading, isSuccess, refetch, setOpen, socialAuth, userData]);

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) setActive(true); else setActive(false)
        })
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement | null
        if (target && target.id === 'screen') {
            setOpenSidebar(false)
        }
    }


    return (
        <div className='w-full relative' >
            <div className={
                `${active
                    ? "dark:bg-opacity-50 dark:bg-linear-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-20 z-80 border-b dark:border-[#ffffff11c] shadow-xl transition duration-500 "
                    : "w-full border-b dark:border-[#ffffff1c] h-20 z-80 dark:shadow "
                }`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-20 flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className={`text-[25px] font-Poppins font-medium text-black dark:text-white no-repeat`}
                            >Elearning</Link>
                        </div>
                        <div className='flex items-center'>
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* only for mobile view */}
                            <div
                                className='800px:hidden'
                            >
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className='cursor-pointer dark:text-white text-black'
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            {
                                userData ? (
                                    <Link href={'/profile'}>
                                        <Image
                                            src={userData.user.avatar ? userData.user.avatar.url : avatar}
                                            width={100}
                                            height={100}
                                            alt="Avatar"
                                            className="w-7.5 h-7.5 rounded-full"
                                            style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                                        />
                                    </Link>
                                ) :
                                    (
                                        <HiOutlineUserCircle
                                            size={25}
                                            className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                            onClick={() => setOpen(true)}
                                        />
                                    )
                            }
                        </div>

                    </div>
                </div>
                {/* mobile sidebar */}
                {openSidebar && (
                    <div
                        className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                        onClick={handleClose}
                        id="screen"
                    >
                        <div className="w-[70%] fixed z-[999999999] h-screen bg-white top-0 right-0 dark:bg-slate-900 dark:bg-opacity-90">
                            <NavItems activeItem={activeItem} isMobile={true} />

                            {userData ? (
                                <Link href={"/profile"}>
                                    <Image
                                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                                        alt=""
                                        width={30}
                                        height={30}
                                        className="w-[30px] h-[30px] rounded-full cursor-pointer ml-[20px] "
                                        style={{
                                            border: activeItem === 5 ? "2px solid #37a39a" : "",
                                        }}
                                    />
                                </Link>
                            ) : (
                                <HiOutlineUserCircle
                                    size={25}
                                    className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                                    onClick={() => setOpen(true)}
                                />
                            )}
                            <br />
                            <br />
                            <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                                {`Copyrigt ©️ ${currentYear} E-Learning`}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {
                route === 'Login' && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Login}
                                    refetch={refetch}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === 'Sign-Up' && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Signup}

                                />
                            )
                        }
                    </>
                )
            }
            {
                route === 'Verification' && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Header