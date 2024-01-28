import styles from "./Sidebar.module.css";
import { AppNav } from "./AppNav";
import { Logo } from "./Logo";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { SidebarCollapser } from "./SidebarCollapser";

export function Sidebar({ sidebarHidden, setSidebarHidden }) {
    return (
        <div className={`${styles.sidebar} ${sidebarHidden ? styles.sidebarHidden : ""}`}>
            <Logo />
            <AppNav />
            <Outlet />
            <Footer />
            <SidebarCollapser sidebarHidden={sidebarHidden} onSidebarHidden={setSidebarHidden} />
        </div>
    );
}
