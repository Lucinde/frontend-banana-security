import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import tokenValidation from "../helpers/tokenValidation";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    // MOUNTING
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && tokenValidation(token)) {
            const decoded = jwt_decode(token);
            void getUserData(decoded.sub, token);
        } else {
            logout();
        }
    }, []);

    async function getUserData(id, jwt, redirect) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    }
                });
            console.log(response);
            setAuthData({
                ...authData,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done'
            });
            navigate(redirect);

        } catch (e) {
            console.error("verkeerde gegevens ingevoerd. " + e);
            //maak hier nog UI om de gebruiker te laten zien wat er fout gaat
            setAuthData({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function login(jwtToken) {
        localStorage.setItem('token', jwtToken);
        const jwtDecoded = jwt_decode(jwtToken);
        console.log(jwtDecoded);
        getUserData(jwtDecoded.sub, jwtToken, '/profile');
        // setAuthData({...authData, isAuth: true, user: jwtDecoded.email });
        // console.log(`User ${jwtDecoded.email} is ingelogd!`);
        // navigate("/profile");
    }

    function logout() {
        localStorage.clear();
        setAuthData({
            ...authData,
            isAuth: false,
            user: null,
            status: 'done'
        });
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
            {authData.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;