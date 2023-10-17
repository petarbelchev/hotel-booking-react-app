export function Button({
    name,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            style={{ margin: "10px" }}
        >
            {name}
        </button>
    );
};