import React, {FunctionComponent, useState} from "react";

interface User {
    name: string
}

interface AuthenticatedContext {
    login: (user: User) => void;
    logout: () => void;
    user: User | null;
}

const defaultAuthContext: AuthenticatedContext = {
    login: () => {},
    logout: () => {},
    user: null
};

export const AuthenticatedUser = React.createContext<AuthenticatedContext>(defaultAuthContext);

export const UserProvider: FunctionComponent = ({children}) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (user: User) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
    }

    const contextValue: AuthenticatedContext = {
        user, login, logout
    }

    return <AuthenticatedUser.Provider value={contextValue}>
        {children}
    </AuthenticatedUser.Provider>;
}

