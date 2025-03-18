import { useContext,createContext,useState, useEffect } from "react";
import Loader from "../components/Utilities/Loaders/Loader";

const AuthContext=createContext();


const AuthProvider=({children})=>{
    // All States
    const [isLoading,setIsLoading]=useState(false);
    const [session,setSession]=useState(false);
    const [userInfo,setUserInfo]=useState(null);

    // UseEffect
    // useEffect(() => {
    //     const checkSession = async () => {
    //       try {
    //         // const token = await AsyncStorage.getItem('authToken');
    //         const token = "bdshskj";
    //         if (token) {
    //             setSession(true);
    //         } else {
    //             setSession(false);
    //         }
    //       } catch (error) {
    //         console.error("Error checking session:", error);
    //         setSession(false);
    //       } finally {
    //         setIsLoading(false); // Set loading to false after checking
    //       }
    //     };
    
    //     checkSession();
    //   }, []);

    // Functions
    const login=async (userName,Password)=>{
        setIsLoading(true);
        setSession(true);
        setIsLoading(false);
    }
    const register=async ()=>{

    }

    // Veriables
    const contextData={session,userInfo,login,register}
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