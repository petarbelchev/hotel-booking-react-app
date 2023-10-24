import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/Buttons/Button";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { Image } from "../../components/Image";
import { AddEditHotelForm } from "../../components/HotelRoom/AddEditHotelForm";
import { AddEditRoomDiv } from "../../components/HotelRoom/AddEditRoomDiv";
import { CommentInfoDiv } from "../../components/CommentReply/CommentInfoDiv";

import { useImage } from "../../hooks/useImage";
import { useForm } from "../../hooks/useForm";
import { useRoomForms } from "../../hooks/useRoomForms";
import { useCities } from "../../hooks/useCities";
import { useComments } from "../../hooks/useComments";

import { getHotel, updateHotel } from "../../services/hotelsService";
import { getHotelRooms, createRoom, updateRoom, removeRoom } from "../../services/roomsService";

import { AuthContext } from "../../contexts/AuthContext";
import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const [hotel, setHotel] = useState({});
    const [hideEditHotelForm, setHideEditHotelForm] = useState(true);
    const [showEditHotelBtn, setShowEditHotelBtn] = useState(true);
    const [showEditRoomsBtn, setShowEditRoomsBtn] = useState(true);
    const [showCommentsBtn, setShowCommentsBtn] = useState(true);

    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();
    const cities = useCities();
    const { form: hotelForm, setForm: setHotelForm, changeHandler: hotelChangeHandler } = useForm({});
    const { roomForms, setRoomForms, addRoomToForm, roomFormsChangeHandler } = useRoomForms([]);
    const { comments, loadComments, loadReplies } = useComments(hotelId);
    const mainImage = useImage(hotel.mainImageId);

    const isOwner = hotel.owner?.id === user?.id;

    useEffect(() => {
        hotelId && getHotel(hotelId)
            .then(hotelData => setHotel(state => ({ ...state, ...hotelData })))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, setHotel]);

    const onEditHotelClick = () => {
        setHotelForm({
            name: hotel.name,
            address: hotel.address,
            cityId: hotel.city.id,
            description: hotel.description,
        });
        setHideEditHotelForm(false);
        setShowEditHotelBtn(false);
    };

    const onCancelClick = () => {
        setHideEditHotelForm(true);
        setShowEditHotelBtn(true);
    };

    const onUpdateHotelSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await updateHotel(hotelId, hotelForm, user.token);
            setHotel(state => ({ ...state, ...data }));
            setHideEditHotelForm(true);
            setShowEditHotelBtn(true);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onEditRoomsClick = () => {
        try {
            getHotelRooms(hotelId, user.token)
                .then(setRoomForms);
            setShowEditRoomsBtn(false);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onCreateUpdateRoomSubmit = async (e, hotelId, roomIdx) => {
        e.preventDefault();
        const room = roomForms[roomIdx];

        try {
            let roomData;

            if (room.id) {
                roomData = await updateRoom(room.id, room, user.token)
            } else {
                roomData = await createRoom(hotelId, room, user.token);
                setHotel(state => ({ ...state, roomsCount: state.roomsCount + 1 }));
            }

            setRoomForms(state => {
                const newState = [...state];
                newState[roomIdx] = roomData;
                return newState;
            });

            alert('The room was successfully updated!');
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onDeleteRoomClick = async (roomId) => {
        try {
            await removeRoom(roomId, user.token);
            setRoomForms(roomForms.filter(room => room.id !== roomId));
            setHotel(state => ({ ...state, roomsCount: state.roomsCount - 1 }));
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onCommentsClick = () => {
        loadComments(hotelId);
        setShowCommentsBtn(false);
    };

    return (
        <main>
            <section>
                <h1>Hotel Details</h1>

                {hotel && (
                    <div className={styles.mainDiv}>
                        <div className={styles.hotelDiv}>
                            {mainImage && <div><Image src={mainImage} alt={hotel.name} /></div>}

                            <div>
                                {hideEditHotelForm
                                    ? <div>
                                        <h2>{hotel.name}</h2>

                                        <div>
                                            <p>{hotel.description}</p>
                                            <span>Rating: {hotel.ratings?.rating} from {hotel.ratings?.ratingsCount} votes</span>
                                            <span> | Favorited from {hotel.usersWhoFavoritedCount} people</span>
                                            {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                                        </div>

                                        <div>
                                            <span>{hotel.city?.name}, {hotel.address}</span>
                                            <span> | Owner: {hotel.owner?.firstName} {hotel.owner?.lastName}</span>
                                            <span> | Rooms: {hotel.roomsCount}</span>
                                        </div>
                                    </div>
                                    : <AddEditHotelForm
                                        hotel={hotelForm}
                                        onChange={hotelChangeHandler}
                                        onSubmit={onUpdateHotelSubmit}
                                        cities={cities}
                                    >
                                        <div>
                                            <Button onClick={onCancelClick} name="Cancel" />
                                            <SubmitButton name="Update Hotel" />
                                        </div>
                                    </AddEditHotelForm>
                                }

                                {comments &&
                                    <div>
                                        <h3>Comments:</h3>

                                        {comments.map(comment =>
                                            <CommentInfoDiv
                                                key={comment.id}
                                                comment={comment}
                                                onRepliesClick={loadReplies}
                                            />
                                        )}
                                    </div>
                                }

                                <div>
                                    {showCommentsBtn && <Button onClick={onCommentsClick} name="Comments" />}
                                    <span>{hotel.commentsCount} comments</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.roomsDiv}>
                            {roomForms.map((room, roomIdx) =>
                                <form
                                    key={roomIdx}
                                    onSubmit={(e) => onCreateUpdateRoomSubmit(e, hotel.id, roomIdx)}
                                >
                                    <AddEditRoomDiv
                                        key={roomIdx}
                                        roomIdx={roomIdx}
                                        room={room}
                                        onChange={(e) => roomFormsChangeHandler(e, roomIdx)}
                                    >
                                        <SubmitButton name={room.id ? "Update Room" : "Create Room"} />
                                        {room.id && <Button onClick={() => onDeleteRoomClick(room.id)} name="Delete Room" />}
                                    </AddEditRoomDiv>
                                </form>
                            )}
                        </div>

                        {isOwner &&
                            <div>
                                {showEditHotelBtn && <Button onClick={onEditHotelClick} name="Edit Hotel" />}
                                {hotel.roomsCount > 0 && showEditRoomsBtn && <Button onClick={onEditRoomsClick} name="Edit Rooms" />}
                                <Button onClick={addRoomToForm} name="Add Room" />
                            </div>
                        }
                    </div>
                )}
            </section>
        </main>
    );
};
