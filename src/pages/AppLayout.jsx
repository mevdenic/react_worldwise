import { useState } from "react";
import { Map } from "../components/Map";
import { Sidebar } from "../components/Sidebar";
import { User } from "../components/User";
import styles from "./AppLayout.module.css";

export function AppLayout() {
    const [sidebarHidden, setSidebarHidden] = useState(true);
    return (
        <div className={styles.app}>
            <Sidebar sidebarHidden={sidebarHidden} setSidebarHidden={setSidebarHidden} />
            <Map sidebarHidden={sidebarHidden} setSidebarHidden={setSidebarHidden} />
            <User />
        </div>
    );
}
