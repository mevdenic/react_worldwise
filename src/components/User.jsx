import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import styles from "./User.module.css";

export function User() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        logout();
        navigate("/");
    }
    if (!isAuthenticated) return;
    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}
