export function InputField({
    type,
    labelName,
    paramName,
    value,
    onChange,
    required,
}) {
    return (
        <div style={{margin: "5px"}}>
            <label htmlFor={paramName}>{labelName}:</label>
            <input
                type={type}
                name={paramName}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};