import React, { FC } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useGetOrdersAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";

type Props = {
    isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {

    const { data, isLoading } = useGetOrdersAnalyticsQuery({})

    // console.log(data);

    // const analyticsData = [
    //     { name: "Page A", Count: 4000 },
    //     { name: "Page B", Count: 3000 },
    //     { name: "Page C", Count: 5000 },
    //     { name: "Page D", Count: 1000 },
    //     { name: "Page E", Count: 4000 },
    //     { name: "Page F", Count: 800 },
    //     { name: "Page G", Count: 200 },
    // ];

    const analyticsData: any = []

    if (data && data.orders && data.orders.last12Months) {
        data.orders.last12Months.forEach((item: any) => {
            analyticsData.push({
                name: item.month,
                Count: item.count
            })
        })
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
                    <div
                        className={isDashboard ? "mb-2" : "mt-[50px]"}
                    >
                        <h1
                            className={`${styles.title} ${isDashboard && "!text-[24px] font-bold"
                                } !text-start px-5`}
                        >
                            Orders Analytics
                        </h1>
                        {!isDashboard && (
                            <p className={`${styles.label} px-5`}>
                                Last 12 months analytics data
                            </p>
                        )}
                    </div>
                    <div
                        className={`w-full ${!isDashboard ? "h-[90%]" : "h-full"
                            } flex items-center justify-center`}
                    >
                        <ResponsiveContainer
                            width={isDashboard ? "100%" : "90%"}
                            height={isDashboard ? "100%" : "50%"}
                        >
                            <LineChart
                                width={500}
                                height={300}
                                data={analyticsData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                {!isDashboard && <Legend />}
                                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderAnalytics