import React, { useEffect, useState } from 'react'
import UserAnalytics from '../Analytics/UserAnalytics'
import { BiBorderLeft } from 'react-icons/bi'
import OrderAnalytics from '../Analytics/OrderAnalytics'
import { PiUsersFourLight } from 'react-icons/pi'
import { Box, CircularProgress } from '@mui/material'
import AllInvoices from '../Order/AllInvoices'
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/app/redux/features/analytics/analyticsApi'
import Loader from '../../Loader/Loader'
type Props = {
    open: boolean,
    value?: number
}

const CircularProgressWithLabel = ({ open, value }: Props) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant="determinate"
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></Box>
        </Box>
    );
};




const DashboardWidgets = ({ open }: Props) => {

    const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
    const [userComparePercentage, setuserComparePercentage] = useState<any>();

    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const { data: ordersData, isLoading: ordersLoading, } = useGetOrdersAnalyticsQuery({});

    useEffect(() => {
        if (isLoading && ordersLoading) {
            return;
        } else {
            if (data && ordersData) {
                const usersLastTwoMonths = data.users.last12Months.slice(-2);
                const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

                if (
                    usersLastTwoMonths.length === 2 &&
                    ordersLastTwoMonths.length === 2
                ) {
                    const usersCurrentMonth = usersLastTwoMonths[1].count;
                    const usersPreviousMonth = usersLastTwoMonths[0].count;
                    const ordersCurrentMonth = ordersLastTwoMonths[1].count;
                    const ordersPreviousMonth = ordersLastTwoMonths[0].count;

                    const usersPercentChange =
                        usersPreviousMonth !== 0
                            ? ((usersCurrentMonth - usersPreviousMonth) /
                                usersPreviousMonth) *
                            100
                            : 100;

                    const ordersPercentChange =
                        ordersPreviousMonth !== 0
                            ? ((ordersCurrentMonth - ordersPreviousMonth) /
                                ordersPreviousMonth) *
                            100
                            : 100;

                    setuserComparePercentage({
                        currentMonth: usersCurrentMonth,
                        previousMonth: usersPreviousMonth,
                        percentChange: usersPercentChange,
                    });

                    setOrdersComparePercentage({
                        currentMonth: ordersCurrentMonth,
                        previousMonth: ordersPreviousMonth,
                        percentChange: ordersPercentChange,
                    });
                }
            }
        }
    }, [isLoading, ordersLoading, data, ordersData]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="min-h-screen px-4 md:px-8 pb-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 w-full h-full">
                            <UserAnalytics isDashboard={true} />
                        </div>

                        <div className="lg:col-span-1 flex flex-col gap-6">
                            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-all hover:shadow-md flex flex-col justify-center">
                                <div className="flex items-center p-5 justify-between">
                                    <div className="">
                                        <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                                        <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[24px] font-bold">
                                            {ordersComparePercentage?.currentMonth}
                                        </h5>
                                        <h5 className="py-2 font-Poppins dark:text-blue-400 text-slate-500 text-[16px] font-[500]">
                                            Sales Obtained
                                        </h5>
                                    </div>
                                    <div>
                                        <CircularProgressWithLabel
                                            value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                                            open={open}
                                        />
                                        <h5 className={`text-center pt-4 font-semibold ${ordersComparePercentage?.percentChange > 0 ? "text-green-500" : "text-red-500"}`}>
                                            {ordersComparePercentage?.percentChange > 0
                                                ? "+" + ordersComparePercentage?.percentChange?.toFixed(2)
                                                : "-" +
                                                ordersComparePercentage?.percentChange?.toFixed(2)}{" "}
                                            %
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-all hover:shadow-md flex flex-col justify-center">
                                <div className="flex items-center p-5 justify-between">
                                    <div className="">
                                        <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                                        <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[24px] font-bold">
                                            {userComparePercentage?.currentMonth}
                                        </h5>
                                        <h5 className="py-2 font-Poppins dark:text-blue-400 text-slate-500 text-[16px] font-[500]">
                                            New Users
                                        </h5>
                                    </div>
                                    <div>
                                        <CircularProgressWithLabel
                                            value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                                            open={open}
                                        />
                                        <h5 className={`text-center pt-4 font-semibold ${userComparePercentage?.percentChange > 0 ? "text-green-500" : "text-red-500"}`}>
                                            {userComparePercentage?.percentChange > 0
                                                ? "+" + userComparePercentage?.percentChange?.toFixed(2)
                                                : "-" +
                                                userComparePercentage?.percentChange?.toFixed(2)}{" "}
                                            %
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-slate-800 w-full min-h-[40vh] shadow-sm border border-gray-100 dark:border-slate-700 rounded-xl p-4">
                            <OrderAnalytics isDashboard={true} />
                        </div>
                        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                            <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
                                Recent Transactions
                            </h5>
                            <AllInvoices isDashboard={true} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardWidgets;