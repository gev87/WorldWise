import { createContext, useReducer } from "react";
import { FAKE_USER } from "../constants";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknown action");
	}
}

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { user, isAuthenticated } = state;

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			console.log("userlogined");
			dispatch({ type: "login", payload: FAKE_USER });
		}
	}

	function logout() {
		dispatch({ type: "logout" });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
