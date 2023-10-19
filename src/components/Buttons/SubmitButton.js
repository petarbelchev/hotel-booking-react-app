import styles from "./Buttons.module.css";

export function SubmitButton({ name }) {
    return (
        <button
            className={styles.button}
            type="submit"
        >
            {name}
        </button>
    );
};