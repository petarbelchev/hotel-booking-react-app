import { useContext } from 'react';

import { FavoriteButton } from '../components/FavoriteButton';
import { markAsFavorite } from '../services/favoriteButtonService';

import { AuthContext } from 'contexts/AuthContext';

export function useFavoriteButton(hotel, setHotel) {
    const { user } = useContext(AuthContext);
    
    const favoriteClickHandler = async () => {
        try {
            const response = await markAsFavorite(hotel.id, user.token);

            setHotel({
                ...hotel,
                isUserFavoriteHotel: response.isFavorite,
                usersWhoFavoritedCount: hotel.usersWhoFavoritedCount + (response.isFavorite ? 1 : - 1),
            });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    return <FavoriteButton
        hotelId={hotel.id}
        onClick={favoriteClickHandler}
        isPressed={hotel.isUserFavoriteHotel}
    />;
};