import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

const defaultContextData = {
    user: [],
    jwt: '',
    setUser: (user: any) => null,
    setJWT: (token: string) => null
};

export const userContext = createContext(defaultContextData);

export const UserProvider = ({ children }: any) => {
    const userDataCookie = (Cookies.get('user') !== undefined && JSON.parse(Cookies.get('user') || "{}") ? JSON.parse(Cookies.get('user') || "{}") : []);
    const jwtDataCookie: string | undefined = Cookies.get('token') !== undefined ? Cookies.get('token') : '' ;
    const [user, setUserData] = useState<any>(userDataCookie || "");
    const [jwt, setJWTData] = useState<string>(jwtDataCookie || "");

    const setUser: any = (user: any) => setUserData(user);
    const setJWT: any = (token: string) => setJWTData(token);

    return (
        <userContext.Provider value={{ user, jwt, setUser, setJWT}}> 
            { children }
        </userContext.Provider>
    );
}