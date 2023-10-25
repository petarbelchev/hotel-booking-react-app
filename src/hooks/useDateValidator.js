import { useState } from "react";

export function useDateValidator(
    initCheckInDate,
    initCheckOutDate
) {
    const [checkInDate, setCheckInDate] = useState(initCheckInDate || '');
    const [checkOutDate, setCheckOutDate] = useState(initCheckOutDate || '');

    const checkInMinDate = new Date();

    const [checkInMaxDate, setCheckInMaxDate] = useState(initCheckOutDate
        ? getDateWithOffset(initCheckOutDate, -1)
        : null
    );

    const [checkOutMinDate, setCheckOutMinDate] = useState(checkInDate
        ? getDateWithOffset(checkInDate, 1)
        : getDateWithOffset(checkInMinDate, 1)
    );

    const onDateChange = (e) => {
        const { name, value } = e.target;

        if (name === 'checkInLocal') {
            if (!value || value === '') {
                setCheckOutMinDate(getDateWithOffset(checkInMinDate, 1))    
            } else {
                setCheckOutMinDate(getDateWithOffset(value, 1));
            }

            setCheckInDate(value);                
        } else if (name === 'checkOutLocal') {
            if (!value || value === '') {
                setCheckInMaxDate(null);                
            } else {
                setCheckInMaxDate(getDateWithOffset(value, -1));                
            }

            setCheckOutDate(value);
        }
    }

    return {
        checkInDate,
        checkInMinDate,
        checkInMaxDate,
        checkOutDate,
        checkOutMinDate,
        onDateChange,
    };
};

const getDateWithOffset = (dateString, dateOffset) => {
    const date = new Date(dateString);
    const resultDate = new Date(date);
    resultDate.setDate(date.getDate() + dateOffset);
    return resultDate;
}
