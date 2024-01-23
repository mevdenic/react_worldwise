import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export function Logo() {
    return (
        <Link to="/">
            <img src="../public/logo.png" alt="WorldWise logo" className={styles.logo} />
        </Link>
    );
}
