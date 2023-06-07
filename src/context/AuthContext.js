import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

function AuthContextProvider({ children }) {
    const [authData, setAuthData] = useState({ isAuth: false, user: '' });
    const navigate = useNavigate();

    function login(email) {
        setAuthData({ isAuth: true, user: email });
        console.log(`User ${email} is ingelogd!`);
        navigate("/profile");
    }

    function logout() {
        setAuthData({ isAuth: false, user: '' });
        console.log("De gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        isAuth: authData.isAuth,
        user: authData.user,
        logout: logout,
        login: login
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;