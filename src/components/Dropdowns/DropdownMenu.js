import { useState } from "react";
import styles from "./DropdownMenu.module.css"

export function DropdownMenu({ menuImage, buttons }) {
    const [showMenu, setShowMenu] = useState(false);

    const menuClickHandler = (btnClickHandler) => {
        setShowMenu(!showMenu);

        if (btnClickHandler) {
            btnClickHandler();
        }
    };

    return (
        <div>
            <button
                className={styles.button}
                onClick={() => menuClickHandler()}
            >
                {menuImage}
            </button>

            {showMenu &&
                <div className={styles.container}>
                    {buttons.map((btn, i) =>
                        <div key={i}>
                            <button
                                className={styles.button}
                                onClick={() => menuClickHandler(btn.onClick)}
                            >
                                {btn.name}
                            </button>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};