export function Select({
    labelName,
    paramName,
    items,
    value,
    onSelectChange,
}) {
    return (
        <div>
            <label htmlFor={paramName}>{labelName}</label>

            <select
                id={paramName}
                name={paramName}
                value={value}
                onChange={onSelectChange}
            >
                {items.map(item =>
                    <option
                        key={item.id}
                        value={item.id}>
                        {item.name}
                    </option>
                )}
            </select>
        </div>
    );
};