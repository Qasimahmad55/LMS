import { apiSlice } from "../api/apiSlice"
import { userLoaded, userLoggedIn, userLoggedOut, userRegisteration } from "./authSlice"


type RegisterationResponse = {
    message: string,
    activationToken: string
}

type RegisterationData = {}


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterationResponse, RegisterationData>({
            query: (data) => ({
                url: "registeration",
                method: "POST",
                body: data,
                credentials: "include" as const
            }),
            async onQueryStarted(org, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(
                        userRegisteration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "activate-user",
                method: "POST",
                body: {
                    activation_token,
                    activation_code,
                },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login-user",
                method: "POST",
                body: {
                    email, password
                },
                credentials: "include" as const
            }),
            async onQueryStarted(org, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    localStorage.setItem("lms-authenticated", "true")
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        socialAuth: builder.mutation({
            query: ({ email, name,avatar }) => ({
                url: "socialAuth",
                method: "POST",
                body: {
                    email, name,avatar
                },
                credentials: "include" as const
            }),
            async onQueryStarted(org, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    localStorage.setItem("lms-authenticated", "true")
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        logout: builder.query({
            query: () => ({
                url: "logout-user",
                method: "get",
                credentials: "include" as const
            }),
            async onQueryStarted(org, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled
                    localStorage.removeItem("lms-authenticated")
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),

    })
})

export const { useRegisterMutation, useActivationMutation, useLoginMutation,useSocialAuthMutation,useLogoutQuery } = authApi