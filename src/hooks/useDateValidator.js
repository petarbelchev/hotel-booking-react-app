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

    function onDateChange(e) {
        const dateString = e.target.value;

        if (e.target.name === 'checkInLocal') {
            setCheckOutMinDate(getDateWithOffset(dateString, 1));
            setCheckInDate(dateString);
        } else if (e.target.name === 'checkOutLocal') {
            setCheckInMaxDate(getDateWithOffset(dateString, -1));
            setCheckOutDate(dateString);
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

function getDateWithOffset(dateString, dateOffset) {
    const date = new Date(dateString);
    const resultDate = new Date(date);
    resultDate.setDate(date.getDate() + dateOffset);
    return resultDate;
}
