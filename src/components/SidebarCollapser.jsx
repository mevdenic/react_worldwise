import styles from "./SidebarCollapser.module.css";

export function SidebarCollapser({ sidebarHidden, onSidebarHidden }) {
    function handleClick() {
        onSidebarHidden(!sidebarHidden);
    }
    return (
        <button
            className={`${styles.collapserButton} ${
                !sidebarHidden ? styles.collapserButtonHidden : ""
            }`}
            onClick={handleClick}
        >
            {!sidebarHidden ? "<" : ">"}
        </button>
    );
}
