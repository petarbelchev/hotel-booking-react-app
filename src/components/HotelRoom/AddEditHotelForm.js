import { InputField } from "../InputField";
import { Dropdown } from "../Dropdown";

import styles from "./AddEditHotelForm.module.css";

export function AddEditHotelForm({
    hotel,
    onChange,
    onSubmit,
    cities,
    children,
}) {

    return (
        <form
            className={styles.hotelForm}
            onSubmit={onSubmit}
        >
            <InputField
                type="text"
                labelName="Hotel Name"
                paramName="name"
                value={hotel.name}
                onChange={onChange}
                required={true}
            />
            <InputField
                type="text"
                labelName="Address"
                paramName="address"
                value={hotel.address}
                onChange={onChange}
                required={true}
            />
            <Dropdown
                labelName={"City:"}
                items={cities}
                paramName={"cityId"}
                value={hotel.cityId}
                onSelectChange={onChange}
            />
            <InputField
                type="text"
                labelName="Description"
                paramName="description"
                value={hotel.description}
                onChange={onChange}
                required={true}
            />
            {children}
        </form>
    );
};