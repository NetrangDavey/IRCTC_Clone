import { useContext,createContext,useState, useEffect } from "react";
import Loader from "../components/Utilities/Loaders/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext=createContext();


const AuthProvider=({children})=>{
    // All States
    const [isLoading,setIsLoading]=useState(false);
    const [session,setSession]=useState(false);
    const [userInfo,setUserInfo]=useState(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            setIsLoading(true);
            const userSession = await AsyncStorage.getItem('userSession');
            setSession(!!userSession);
        } catch (error) {
            console.error("Error checking session:", error);
            setSession(false);
        } finally {
            setIsLoading(false);
        }
    };
    // Functions
    const login=async (userName,Password)=>{
        setIsLoading(true);
        // await AsyncStorage.setItem('userSession',true);
        setSession(true);
        setIsLoading(false);
    }
    const logout=async ()=>{
        setIsLoading(true);
        await AsyncStorage.removeItem('userSession');
        setSession(false);
        setIsLoading(false);
    }
    const register=async ()=>{

    }

    // Veriables
    const contextData={session,userInfo,login,logout,register}
    return (
        <AuthContext.Provider value={contextData}>
            {
                isLoading?<Loader />:<>{children}</>
            }
            
        </AuthContext.Provider>
    )
}



// Custom Hooks 
const useAuth=()=>{
    return useContext(AuthContext);
}

export {useAuth,AuthContext,AuthProvider};