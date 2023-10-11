export function Dropdown({
    labelName,
    paramName,
    items,
}) {
    return (
        <>
            <label htmlFor={paramName}>{labelName}</label>
            <select id={paramName} name={paramName}>
                {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
        </>
    );
}