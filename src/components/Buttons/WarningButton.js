import styles from "./Buttons.module.css";

export function WarningButton({
    type = "button",
    name,
    onClick,
}) {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles.warning}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};