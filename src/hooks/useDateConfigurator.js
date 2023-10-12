import { useState } from "react";

export function useDateConfigurator() {
    const checkInMinDate = new Date();
    const [checkInMaxDate, setCheckInMaxDate] = useState(null);
    const [checkOutMinDate, setCheckOutMinDate] = useState(() => {
        const date = new Date(checkInMinDate);
        date.setDate(checkInMinDate.getDate() + 1);
        return date;
    });
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    function onDateChange(e) {
        const date = new Date(e.target.value);

        if (e.target.name === 'checkInLocal') {
            date.setDate(date.getDate() + 1);
            setCheckOutMinDate(date);
            setCheckInDate(e.target.value);
        } else if (e.target.name === 'checkOutLocal') {
            date.setDate(date.getDate() - 1);
            setCheckInMaxDate(date);
            setCheckOutDate(e.target.value);
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