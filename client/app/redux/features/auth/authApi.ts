import { apiSlice } from "../api/apiSlice"
import { userLoggedIn, userRegisteration } from "./authSlice"


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
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.activationToken,
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
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.activationToken,
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

export const { useRegisterMutation, useActivationMutation, useLoginMutation,useSocialAuthMutation } = authApi