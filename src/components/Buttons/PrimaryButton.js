import styles from './Buttons.module.css';

export function PrimaryButton({
    type = "button",
    name,
    onClick,
}) {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles.primary}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};