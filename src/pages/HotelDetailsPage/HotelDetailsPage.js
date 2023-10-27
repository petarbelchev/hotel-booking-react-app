import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { DangerButton } from "../../components/Buttons/DangerButton";
import { Image } from "../../components/Image";
import { AddEditHotelForm } from "../../components/HotelRoom/AddEditHotelForm";
import { AddEditRoomDiv } from "../../components/HotelRoom/AddEditRoomDiv";
import { HotelInfoDiv } from "../../components/HotelRoom/HotelInfoDiv";
import { RatingDiv } from "../../components/RatingDiv";
import { CommentsDiv } from "../../components/CommentReply/CommentsDiv";

import { useImage } from "../../hooks/useImage";
import { useForm } from "../../hooks/useForm";
import { useRoomForms } from "../../hooks/useRoomForms";
import { useCities } from "../../hooks/useCities";

import { getHotel, updateHotel, removeHotel, markAsFavorite } from "../../services/hotelsService";
import { getHotelRooms, createRoom, updateRoom, removeRoom } from "../../services/roomsService";
import { setHotelRating } from "../../services/ratingsService";

import { AuthContext } from "../../contexts/AuthContext";
import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const [hotel, setHotel] = useState({});
    const [hideEditHotelForm, setHideEditHotelForm] = useState(true);
    const [showEditHotelBtn, setShowEditHotelBtn] = useState(true);
    const [showEditRoomsBtn, setShowEditRoomsBtn] = useState(false);

    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();
    const navigate = useNavigate();

    const hooks = {
        cities: useCities(),
        mainImage: useImage(hotel.mainImageId),
        hotelForm: useForm({}),
        roomForms: useRoomForms([]),
    };

    const isOwner = hotel.owner?.id === user?.id;

    useEffect(() => {
        hotelId && getHotel(hotelId, user?.token)
            .then(hotelData => {
                setHotel(state => ({ ...state, ...hotelData }));
                hotelData.roomsCount > 0 && setShowEditRoomsBtn(true);
            })
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, user?.token, setHotel]);

    const editHotelClickHandler = () => {
        hooks.hotelForm.setForm({
            name: hotel.name,
            address: hotel.address,
            cityId: hotel.city.id,
            description: hotel.description,
        });
        setHideEditHotelForm(false);
        setShowEditHotelBtn(false);
    };

    const cancelClickHandler = () => {
        setHideEditHotelForm(true);
        setShowEditHotelBtn(true);
    };

    const updateHotelSubmitHandler = async (e) => {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to update the hotel?')) {
            try {
                const data = await updateHotel(hotelId, hooks.hotelForm.form, user.token);
                setHotel(state => ({ ...state, ...data }));
                setHideEditHotelForm(true);
                setShowEditHotelBtn(true);
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    const increaseCommentsCountHandler = () => {
        setHotel({ ...hotel, commentsCount: hotel.commentsCount + 1 });
    };

    const decreaseCommentsCountHandler = () => {
        setHotel({ ...hotel, commentsCount: hotel.commentsCount - 1 });
    };

    const addRoomClickHandler = () => hooks.roomForms.addRoomToForm();

    const editRoomsClickHandler = async () => {
        try {
            hooks.roomForms.setForms(await getHotelRooms(hotelId, user.token));
            setShowEditRoomsBtn(false);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const createUpdateRoomSubmitHandler = async (e, roomIdx) => {
        e.preventDefault();
        const room = hooks.roomForms.forms[roomIdx];

        try {
            let roomData;

            if (room.id) {
                roomData = await updateRoom(room.id, room, user.token)
            } else {
                roomData = await createRoom(hotel.id, room, user.token);
                setHotel(state => ({ ...state, roomsCount: state.roomsCount + 1 }));
            }

            hooks.roomForms.setForms(state => {
                const newState = [...state];
                newState[roomIdx] = roomData;
                return newState;
            });

            alert('The room was successfully updated!');
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const deleteRoomClickHandler = async (roomId) => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this room?')) {
            try {
                await removeRoom(roomId, user.token);
                hooks.roomForms.setForms(
                    hooks.roomForms.forms.filter(room => room.id !== roomId)
                );
                setHotel({ ...hotel, roomsCount: hotel.roomsCount - 1 });
            } catch (error) {
                alert(`${error.status} ${error.title}!`);
            }
        }
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

    return (
        <main>
            <section>
                <h1>Hotel Details</h1>

                <div className={styles.mainDiv}>
                    <div className={styles.hotelDiv}>
                        {hooks.mainImage &&
                            <div><Image src={hooks.mainImage} alt={hotel.name} /></div>
                        }

                        <div>
                            {hideEditHotelForm
                                ? <HotelInfoDiv
                                    hotel={hotel}
                                    onFavoriteClickHandler={favoriteClickHandler}
                                    RatingDiv={user && <RatingDiv
                                        userRating={hotel.ratings?.userRating}
                                        onRatingClickHandler={hotelRatingClickHandler}
                                    />}
                                />
                                : <AddEditHotelForm
                                    hotel={hooks.hotelForm.form}
                                    onChange={hooks.hotelForm.formChangeHandler}
                                    onSubmit={updateHotelSubmitHandler}
                                    cities={hooks.cities}
                                >
                                    <div>
                                        <PrimaryButton onClick={cancelClickHandler} name="Cancel" />
                                        <PrimaryButton type="submit" name="Update Hotel" />
                                    </div>
                                </AddEditHotelForm>
                            }

                            <CommentsDiv
                                hotelId={hotelId}
                                commentsCount={hotel.commentsCount}
                                increaseCommentsCountHandler={increaseCommentsCountHandler}
                                decreaseCommentsCountHandler={decreaseCommentsCountHandler}
                            />
                        </div>
                    </div>

                    <div className={styles.roomsDiv}>
                        {hooks.roomForms.forms.map((room, roomIdx) =>
                            <form
                                key={roomIdx}
                                onSubmit={(e) => createUpdateRoomSubmitHandler(e, roomIdx)}
                            >
                                <AddEditRoomDiv
                                    key={roomIdx}
                                    roomIdx={roomIdx}
                                    room={room}
                                    onChange={(e) => hooks.roomForms.formsChangeHandler(e, roomIdx)}
                                >
                                    <PrimaryButton
                                        type="submit"
                                        name={room.id ? "Update Room" : "Create Room"}
                                    />

                                    {room.id &&
                                        <DangerButton
                                            onClick={() => deleteRoomClickHandler(room.id)}
                                            name="Delete Room"
                                        />
                                    }
                                </AddEditRoomDiv>
                            </form>
                        )}
                    </div>

                    {isOwner &&
                        <div>
                            <hr />

                            {showEditHotelBtn &&
                                <PrimaryButton
                                    onClick={editHotelClickHandler}
                                    name="Edit Hotel"
                                />
                            }

                            {hotel.roomsCount > 0 && showEditRoomsBtn &&
                                <PrimaryButton
                                    onClick={editRoomsClickHandler}
                                    name="Edit Rooms"
                                />
                            }

                            <PrimaryButton onClick={addRoomClickHandler} name="Add Room" />
                            <DangerButton onClick={deleteHotelClickHandler} name="Delete Hotel" />
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};
