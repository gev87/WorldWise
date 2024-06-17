import { useContext } from "react";
import { AuthContext } from "./FakeAuthContext";

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error("AuthContext was used outside the AuthProvider");
	return context;
}

export default useAuth;