import { apiSlice } from "../api/apiSlice";


export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseAnalytics: builder.query({
            query: () => ({
                url: "get-courses-anlaytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "get-orders-anlaytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getUsersAnalytics: builder.query({
            query: () => ({
                url: "get-users-anlaytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const { useGetCourseAnalyticsQuery, useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } = analyticsApi