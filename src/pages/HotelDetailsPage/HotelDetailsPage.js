import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { Image } from "../../components/Image";
import { AddEditHotelForm } from "../../components/HotelRoom/AddEditHotelForm";
import { HotelInfoDiv } from "../../components/HotelRoom/HotelInfoDiv";
import { RatingDiv } from "../../components/RatingDiv";
import { RoomsDiv } from "../../components/HotelRoom/RoomsDiv";
import { CommentsDiv } from "../../components/CommentReply/CommentsDiv";

import { useImage } from "../../hooks/useImage";
import { useForm } from "../../hooks/useForm";
import { useCities } from "../../hooks/useCities";

import { getHotel, updateHotel, removeHotel, markAsFavorite } from "../../services/hotelsService";
import { setHotelRating } from "../../services/ratingsService";

import { AuthContext } from "../../contexts/AuthContext";

export function HotelDetailsPage() {
    const [hotel, setHotel] = useState({});
    const [showEditHotelForm, setShowEditHotelForm] = useState(false);
    const [showHotelRooms, setShowHotelRooms] = useState(false);

    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();
    const cities = useCities();
    const mainImage = useImage(hotel.mainImageId);
    const hotelForm = useForm({});
    const navigate = useNavigate();

    useEffect(() => {
        hotelId && getHotel(hotelId, user?.token)
            .then(hotelData => setHotel(state => ({ ...state, ...hotelData })))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, user?.token, setHotel]);

    const editHotelClickHandler = () => {
        hotelForm.setForm({
            name: hotel.name,
            address: hotel.address,
            cityId: hotel.city.id,
            description: hotel.description,
        });
        setShowEditHotelForm(true);
    };

    const manageRoomsClickHandler = () => setShowHotelRooms(true);
    const cancelClickHandler = () => setShowEditHotelForm(false);
    const doneClickHandler = () => setShowHotelRooms(false);

    const updateHotelSubmitHandler = async (e) => {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to update the hotel?')) {
            try {
                const data = await updateHotel(hotelId, hotelForm.form, user.token);
                setHotel(state => ({ ...state, ...data }));
                setShowEditHotelForm(false);
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    const increaseRoomsCountHandler = () => {
        setHotel(state => ({ ...state, roomsCount: state.roomsCount + 1 }));
    };

    const increaseCommentsCountHandler = () => {
        setHotel({ ...hotel, commentsCount: hotel.commentsCount + 1 });
    };

    const decreaseRoomsCountHandler = () => {
        setHotel({ ...hotel, roomsCount: hotel.roomsCount - 1 });
    };

    const decreaseCommentsCountHandler = () => {
        setHotel({ ...hotel, commentsCount: hotel.commentsCount - 1 });
    };

    const deleteHotelClickHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete your hotel?')) {
            try {
                await removeHotel(hotelId, user.token);
                navigate('/');
            } catch (error) {
                alert(`${error.status} ${error.title}`);
            }
        }
    };

    const favoriteClickHandler = async () => {
        try {
            const response = await markAsFavorite(hotelId, user.token);

            setHotel({
                ...hotel,
                isUserFavoriteHotel: response.isFavorite,
                usersWhoFavoritedCount: hotel.usersWhoFavoritedCount + (response.isFavorite ? 1 : - 1),
            });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const hotelRatingClickHandler = async (ratingValue) => {
        try {
            const response = await setHotelRating(hotelId, ratingValue, user.token);
            setHotel({ ...hotel, ratings: response });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

    const addImageClickHandler = () => { };

    return (
        <main>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {mainImage &&
                    <div><Image src={mainImage} alt={hotel.name} /></div>
                }

                <div style={{ display: "inline-block" }}>
                    {showEditHotelForm
                        ? <AddEditHotelForm
                            hotel={hotelForm.form}
                            onChange={hotelForm.formChangeHandler}
                            onSubmit={updateHotelSubmitHandler}
                            cities={cities}
                        >
                            <div>
                                <PrimaryButton onClick={cancelClickHandler} name="Cancel" />
                                <PrimaryButton type="submit" name="Update Hotel" />
                            </div>
                        </AddEditHotelForm>
                        : <HotelInfoDiv
                            hotel={hotel}
                            onFavoriteClickHandler={favoriteClickHandler}
                            onEditHotelClickHandler={editHotelClickHandler}
                            onDeleteHotelClickHandler={deleteHotelClickHandler}
                            onAddImageClickHandler={addImageClickHandler}
                            onManageRoomsClickHandler={manageRoomsClickHandler}
                            RatingDiv={user &&
                                <RatingDiv
                                    userRating={hotel.ratings?.userRating}
                                    onRatingClickHandler={hotelRatingClickHandler}
                                />
                            }
                            userId={user.id}
                        />
                    }

                    <CommentsDiv
                        hotelId={hotelId}
                        commentsCount={hotel.commentsCount}
                        increaseCommentsCountHandler={increaseCommentsCountHandler}
                        decreaseCommentsCountHandler={decreaseCommentsCountHandler}
                    />
                </div>
            </div>

            {showHotelRooms &&
                <RoomsDiv
                    hotelId={hotelId}
                    roomsCount={hotel.roomsCount}
                    onDoneClickHandler={doneClickHandler}
                    increaseRoomsCountHandler={increaseRoomsCountHandler}
                    decreaseRoomsCountHandler={decreaseRoomsCountHandler}
                    token={user.token}
                />
            }
        </main >
    );
};
