'use client'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import { authSlice } from './features/auth/authSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
//call our load user functioon on every page load

const initializeApp = async () => {
    if (typeof window === 'undefined' || localStorage.getItem("lms-authenticated") !== "true") {
        return
    }

    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp()