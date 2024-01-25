import { useContext } from 'react';

import { RatingDiv } from '../components/RatingDiv';
import { setHotelRating } from '../services/ratingsService';
import { AuthContext } from 'contexts/AuthContext';

export function useHotelRating(hotel, setHotel) {
    const { user } = useContext(AuthContext);

    const hotelRatingClickHandler = async (ratingValue) => {
        try {
            const response = await setHotelRating(hotel.id, ratingValue, user.token);
            setHotel({ ...hotel, ratings: response });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    return <RatingDiv
        userRating={hotel.ratings?.userRating}
        onRatingClickHandler={hotelRatingClickHandler}
    />;
};