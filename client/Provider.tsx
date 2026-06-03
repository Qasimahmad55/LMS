import { Provider } from "react-redux"
import { store } from "./app/redux/store"
// import { ReactNode } from "react"

interface ProviderProps {
    children: any
}

export function Providers({ children }: ProviderProps) {
    return <Provider store={store}>{children}</Provider>
}