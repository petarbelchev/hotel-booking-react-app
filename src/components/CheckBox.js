export function CheckBox({
    labelName, 
    paramName, 
    checked, 
    onChange
}) {
    return (
        <div>
            <label htmlFor={paramName}>{labelName}:</label>
            <input
                type="checkbox"
                name={paramName}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};