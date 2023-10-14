export function Dropdown({
    labelName,
    paramName,
    items,
    value,
    onSelectChange,
}) {
    return (
        <>
            <label htmlFor={paramName}>{labelName}</label>
            <select
                id={paramName}
                name={paramName}
                value={value}
                onChange={onSelectChange}
            >
                {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
        </>
    );
}