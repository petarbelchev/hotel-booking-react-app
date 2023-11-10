import { InputField } from "../InputField";
import { Select } from "../Select";

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
            <Select
                labelName={"City:"}
                items={cities}
                paramName={"cityId"}
                value={hotel.cityId}
                onSelectChange={onChange}
            />
            <InputField
                type="textarea"
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