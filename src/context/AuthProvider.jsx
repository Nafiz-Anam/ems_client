import React, { createContext, useContext } from "react";
import useAuthCheck from "../hook/useAuthCheck";
import InitialLoading from "../components/loading/InitialLoading";

const AuthProvider = ({ children }) => {
    const AuthContext = createContext();
    const authChecked = useAuthCheck();
    // console.log(authChecked);
    return (
        <AuthContext.Provider value={""}>
            {!authChecked ? <InitialLoading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const userAuthContext = () => {
    const value = useContext(AuthProvider);
    if (value == null) throw Error("Cannot use outside of Context");
    return value;
};
