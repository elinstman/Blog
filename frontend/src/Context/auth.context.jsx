import React, { useState, useContext, useEffect } from "react";

const AuthContext = React.createContext({
    isVerified: false,
    userName: "",
    userId: "",
    handleLogout: () => {},
    getUser: async (accessToken) => {}
})
const VerifiedLoginContext = React.createContext();
const UserNameContext = React.createContext();
const handleLogoutContext =React.createContext();

export function useVerifiedLogin() {
    return useContext(VerifiedLoginContext)
}

export function useUserName() {
    return useContext(UserNameContext)
}

export function useHandleLogout() {
    return useContext(handleLogoutContext)
}


export function AuthProvider({ children }) {
    const [isVerified, setIsVerified] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        checkVerified();
    },[]);

    useEffect(() => {
        if (!isVerified) {
            setUserName("");
        }
    }, [isVerified]);

    
    useEffect(() => {
        // Återställ inloggningstillståndet när komponenten avmonteras
        return () => {
            setIsVerified(false);
        };
    }, []);


    const checkVerified = async () => {
            const accessToken = localStorage.getItem("accessToken");
            getUser(accessToken);
            
    };

    const getUser = async (accessToken) => {
        try { 
        if (accessToken) {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                setIsVerified(true);
                const responseData = await response.json();
                setUserName(responseData.userName);
                setUserId(responseData.userId);
            } else {
                setIsVerified(false);
                setUserName("");
                setUserId("");
            }
        } else {
            setIsVerified(false);
            setUserName("");
            setUserId("");
        }
        } catch (error) {
            setIsVerified(false);
            setUserName("");
            setUserId("");
            console.error('Error checking login status:', error);
        }
    }

    // ändra på state om vid logout
    const handleLogout = () => {
        setIsVerified(false);
        setUserName("")
        setUserId("");
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    };


    
    return (
        <VerifiedLoginContext.Provider  value={isVerified }>
            <UserNameContext.Provider value={userName}>
                <handleLogoutContext.Provider value={handleLogout} >
                    <AuthContext.Provider value={{
                        isVerified,
                        userName,
                        userId,
                        handleLogout,
                        getUser
                    }}>
                        {children}
                    </AuthContext.Provider>
                </handleLogoutContext.Provider>
            </UserNameContext.Provider>
        </VerifiedLoginContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}