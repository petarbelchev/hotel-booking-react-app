import styles from "./Buttons.module.css";

export function Button({
    name,
    onClick,
}) {
    return (
        <button
            className={styles.button}
            onClick={onClick}
        >
            {name}
        </button>
    );
};