import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { userLoaded, userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
})

const customBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error.status === 400 || result.error.status === 401 || result.error.status === 403)) {
        const errorData = result.error.data as any;
        if (errorData?.message === "Json web token is expired,try again" || errorData?.message === "Access Token is not valid") {
            const refreshResult = await baseQuery({ url: 'refresh', method: "GET", credentials: "include" }, api, extraOptions);

            if (refreshResult.data) {
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(userLoggedOut());
            }
        }
    }

    return result;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: 'refresh',
                method: "GET",
                credentials: 'include' as const
            }),

        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(org, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(
                        userLoaded({
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        })
    })
})

export const { useRefreshTokenQuery,useLoadUserQuery } = apiSlice