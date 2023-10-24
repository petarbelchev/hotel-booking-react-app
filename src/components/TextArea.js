export function TextArea({
    placeHolder,
    paramName,
    value,
    onChange,
    rows,
    cols,
    required,
}) {
    return (
        <textarea
            placeholder={placeHolder}
            name={paramName}
            value={value}
            onChange={onChange}
            rows={rows}
            cols={cols}
            required={required}
        />
    );
};