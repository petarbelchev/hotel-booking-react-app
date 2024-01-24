import { HotelDiv } from "./components/HotelDiv";
import { useHotel } from "./hooks/useHotel";
import { useHotelEditor } from "./features/Edit/useHotelEditor";
import { useImageUploader } from "./features/Images/useImageUploader";
import { useHotelRooms } from "./features/Rooms/useHotelRooms";
import { useHotelImages } from "./features/Images/useHotelImages";
import { useHotelRating } from "./features/Rating/useHotelRating";
import { useFavoriteButton } from "./features/Favorite/useFavoriteButton";
import { useHotelComments } from "./features/Comment/useHotelComments";

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