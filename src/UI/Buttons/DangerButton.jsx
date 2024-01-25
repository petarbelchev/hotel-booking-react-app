import styles from './Buttons.module.css';

export function DangerButton({ type = "button", name, onClick }) {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles.danger}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};