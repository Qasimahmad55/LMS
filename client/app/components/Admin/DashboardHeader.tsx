"use client";

import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import ThemeSwitcher from "../ThemeSwitcher";
import socketIO from "socket.io-client";
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from "@/app/redux/features/notifications/notificationApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
    open?: boolean;
    setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
    const [notifications, setNotifications] = useState<any>([]);
    const { data, refetch } = useGetAllNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();

    const [audio] = useState<any>(
        typeof window !== "undefined"
            ? new Audio(
                "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
            )
            : null
    );

    const playNotificationSound = () => {
        if (audio) {
            audio.play().catch((err: any) => console.log("Audio error:", err));
        }
    };

    useEffect(() => {
        if (data && data.notification) {
            setNotifications(
                data.notification.filter((item: any) => item.status === "unread")
            );
        }
    }, [data]);

    useEffect(() => {
        const handleNewNotification = () => {
            refetch();
            playNotificationSound();
        };

        socketId.on("newNotification", handleNewNotification);

        return () => {
            socketId.off("newNotification", handleNewNotification);
        };
    }, [refetch]);

    const handleNotificationStatusChange = async (id: string) => {
        await updateNotificationStatus(id);
        refetch();
    };

    return (
        <div className="w-full flex items-center justify-end p-4 md:p-6 relative z-[9999]">
            <ThemeSwitcher />
            <div
                className="relative cursor-pointer m-2"
                onClick={() => setOpen(!open)}
            >
                <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
                <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                    {notifications && notifications.length}
                </span>
            </div>
            {open && (
                <div className="w-[350px] max-h-[60vh] overflow-y-auto py-3 px-2 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl rounded-xl absolute top-[70px] right-6 z-[10000] backdrop-blur-md transition-all duration-300">
                    <h5 className="text-center text-[20px] font-semibold font-Poppins text-black dark:text-white p-3 border-b border-gray-100 dark:border-slate-800 mb-2">
                        Notifications
                    </h5>

                    {notifications &&
                        notifications.map((item: any, index: number) => (
                            <div
                                className="dark:bg-slate-800/50 bg-gray-50/50 font-Poppins border border-gray-100 dark:border-slate-700/50 rounded-lg mb-2 p-3 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                                key={index}
                            >
                                <div className="w-full flex items-center justify-between pb-2">
                                    <p className="text-black dark:text-white font-medium">{item.title}</p>
                                    <p
                                        className="text-blue-600 dark:text-blue-400 cursor-pointer text-sm hover:underline"
                                        onClick={() => handleNotificationStatusChange(item._id)}
                                    >
                                        Mark as read
                                    </p>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {item.message}
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-[12px] mt-2 font-medium">
                                    {format(item.createdAt)}
                                </p>
                            </div>
                        ))}

                </div>
            )}
        </div>
    );
};

export default DashboardHeader;