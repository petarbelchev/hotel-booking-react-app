import { HotelDiv } from '../components/HotelDiv';
import { useHotel } from './useHotel';
import { useHotelEditor } from '../features/Edit';
import { useHotelRooms } from '../features/Rooms';
import { useHotelImages, useImageUploader } from '../features/Images';
import { useHotelRating } from '../features/Rating';
import { useFavoriteButton } from '../features/Favorite';
import { useHotelComments } from '../features/Comment';

export function useHotelManager(hotelId) {    
    const { hotel, setHotel } = useHotel(hotelId);
    const editor = useHotelEditor(hotel, setHotel);
    const imageUploader = useImageUploader(hotelId, setHotel);
    const rooms = useHotelRooms(hotel, setHotel);
    const images = useHotelImages(hotel);
    const favoriteButton = useFavoriteButton(hotel, setHotel);
    const ratingDiv = useHotelRating(hotel, setHotel);
    const commentsDiv = useHotelComments(hotel, setHotel);

    const hotelDiv = <HotelDiv
        hotel={hotel}
        favoriteButton={favoriteButton}
        onEditHotelClickHandler={editor.editHotelClickHandler}
        onDeleteHotelClickHandler={editor.deleteHotelClickHandler}
        onAddImageClickHandler={() => imageUploader.setShowUploadImageForm(true)}
        onManageRoomsClickHandler={() => rooms.setShowRoomsSection(true)}
        ratingDiv={ratingDiv}
    />;

    return {
        hotelDiv,
        commentsDiv,
        editor,
        rooms,
        images,
        imageUploader,
    };
};