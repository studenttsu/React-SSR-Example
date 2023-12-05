import { createContext, ReactNode, useContext } from "react";
import AppStore from "./AppStore";

const StoreContext = createContext<AppStore>(null!);

export function StoreProvider({ value, children }: { value: AppStore, children: ReactNode; }) {
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);