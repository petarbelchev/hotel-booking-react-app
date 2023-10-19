import styles from "./Buttons.module.css";

export function SmallButton({
    name,
    onClick,
}) {
    return (
        <button
            className={`${styles.button} ${styles.small}`}
            onClick={onClick}
        >
            {name}
        </button>
    )
};