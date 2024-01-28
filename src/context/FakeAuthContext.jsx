import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    wrongCreds: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                wrongCreds: false,
            };
        case "wrongCreds":
            return {
                ...state,
                wrongCreds: true,
            };
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                wrongCreds: false,
            };
        case "reset":
            return initialState;
        default:
            throw new Error("Unknown action");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

export function AuthProvider({ children }) {
    const [{ user, isAuthenticated, wrongCreds }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER });
        else dispatch({ type: "wrongCreds" });
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, logout, wrongCreds, dispatch }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("AuthContext was used outside AuthProvider.");
    return context;
}
