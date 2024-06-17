import { useNavigate } from "react-router-dom";
import { FAKE_USER } from "../constants";
import useAuth from "../contexts/useAuth";
import styles from "./User.module.css";

function User() {
	const user = FAKE_USER;
	const { logout } = useAuth();
	const navigate = useNavigate();

	function handleClick() {
		logout();
		navigate("/");
	}

	return (
		<div className={styles.user}>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default User;
