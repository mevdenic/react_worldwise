import styles from "./Sidebar.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by Mevdenic
            </p>
        </footer>
    );
}
