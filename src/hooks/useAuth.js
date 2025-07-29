import { AuthContext } from "@/components/context/AuthProvider";
import { createContext } from "react";


const useAuth = () => {
    const context = createContext(AuthContext);

    if(!AuthContext){
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context;
}

export default useAuth;