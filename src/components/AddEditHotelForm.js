import { useEffect } from "react";

import { InputField } from "./InputField";
import { Dropdown } from "./Dropdown";

import { useCities } from "../hooks/useCities";

export function AddEditHotelForm({
    hotel,
    setCityId,
    onChange,
    onSubmit,
    children,
}) {
    const cities = useCities();

    useEffect(() => {
        if (!hotel.cityId || hotel.cityId === 0) {
            (hotel.city && setCityId(hotel.city.id)) || (cities[0] && setCityId(cities[0].id));
        }
    }, [cities, hotel.cityId, hotel.city, setCityId]);

    return (
        <form onSubmit={onSubmit} style={{ borderStyle: "solid", padding: "10px" }}>
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