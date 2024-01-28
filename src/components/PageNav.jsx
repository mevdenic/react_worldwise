import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import styles from "./PageNav.module.css";
import { useState } from "react";

export function PageNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className={styles.nav}>
            <Logo />

            <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={styles.ctaLink}>
                        Login
                    </NavLink>
                </li>
            </ul>
            <div className={styles.burger} onClick={toggleMenu}>
                <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
            </div>
        </nav>
    );
}
