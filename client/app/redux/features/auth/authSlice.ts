import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: "",
    user: null as any
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegisteration: (state, action) => {
            state.token = action.payload.token
        },
        userLoggedIn: (state, action) => {
            state.token = action.payload.accessToken
            state.user = action.payload.user
        },
        userLoaded: (state, action) => {
            state.user = action.payload.user
        },
        userLoggedOut: (state) => {
            state.token = ""
            state.user = null
        }
    }
})

export const { userRegisteration, userLoggedIn, userLoaded, userLoggedOut } = authSlice.actions