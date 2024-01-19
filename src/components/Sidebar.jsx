import styles from "./Sidebar.module.css";
import { AppNav } from "./AppNav";
import { Logo } from "./Logo";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <Footer />
        </div>
    );
}
