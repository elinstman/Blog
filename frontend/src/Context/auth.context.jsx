import React, { useState, useContext, useEffect } from "react";

const VerifiedLoginContext = React.createContext();
const UserNameContext = React.createContext();

export function useVerifiedLogin() {
    return useContext(VerifiedLoginContext)
}

export function useUserName() {
    return useContext(UserNameContext)
}


export function AuthProvider({ children }) {
    const [isVerified, setIsVerified] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        checkVerified();

    },[]);


    const checkVerified = async () => {
        try {
            const response = await fetch('http://localhost:8000/');
            if (response.status === 200) {
                setIsVerified(true);
                const responseData = await response.json();
                console.log("response-data", responseData);
                if (responseData.length > 0) {
                    const inloggedUser = responseData[0];
                    if (inloggedUser.userName) {
                        setUserName(inloggedUser.userName);
                        console.log("user name:", inloggedUser.userName);
                    }
                } else {
                    setUserName(""); 
                }
            } else {
                setIsVerified(false);
                setUserName(""); 
            }
        } catch (error) {
            setIsVerified(false);
            setUserName("");
            console.error('Error checking login status:', error);
        }
    }

    return (
        <VerifiedLoginContext.Provider  value={isVerified }>
            <UserNameContext.Provider value={userName}>
    
            {children}
            </UserNameContext.Provider>
        </VerifiedLoginContext.Provider>
    )

}