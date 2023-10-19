import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/Buttons/Button";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { Image } from "../../components/Image";
import { AddEditHotelForm } from "../../components/HotelRoom/AddEditHotelForm";
import { AddEditRoomDiv } from "../../components/HotelRoom/AddEditRoomDiv";
import { CommentInfoDiv } from "../../components/CommentReply/CommentInfoDiv";

import { useImage } from "../../hooks/useImage";
import { useHotel } from "../../hooks/useHotel";
import { useComments } from "../../hooks/useComments";

import { AuthContext } from "../../contexts/AuthContext";

import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();

    // TODO: Separate to useHotel and useRoom hooks?
    const { hotel, changeHandler, loadRooms, addRoom, saveRoom, createNewRoom, deleteRoom, saveHotel, setCityId } = useHotel({
        name: '',
        address: '',
        cityId: 0,
        description: '',
        city: {},
        ratings: {},
        owner: {},
        rooms: [],
    }, hotelId);

    const { comments, loadComments, loadReplies } = useComments(hotelId);

    const mainImage = useImage(hotel && hotel.mainImageId);
    const [hideEditForm, setHideEditForm] = useState(true);
    const [showEditHotelBtn, setShowEditHotelBtn] = useState(true);
    const [showEditRoomsBtn, setShowEditRoomsBtn] = useState(true);
    const [showCommentsBtn, setShowCommentsBtn] = useState(true);
    const isOwner = hotel.owner && user && user.id && hotel.owner.id === user.id;

    const onEditHotelClick = () => {
        setHideEditForm(false);
        setShowEditHotelBtn(false);
    };

    const onCancelClick = () => {
        setHideEditForm(true);
        setShowEditHotelBtn(true);
    };

    const onUpdateHotelSubmit = () => {
        const formData = {
            name: hotel.name,
            cityId: hotel.cityId,
            address: hotel.address,
            description: hotel.description,
        };

        try {
            saveHotel(formData);
            setHideEditForm(true);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onEditRoomsClick = () => {
        try {
            loadRooms();
            setShowEditRoomsBtn(false);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onCreateUpdateRoomSubmit = (e, hotelId, roomIdx) => {
        e.preventDefault();
        const room = hotel.rooms[roomIdx];

        try {
            room.id
                ? saveRoom(roomIdx, room)
                : createNewRoom(hotelId, roomIdx, room);
            alert('The room was successfully updated!');
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onAddRoomClick = () => addRoom();

    const onDeleteRoomClick = (roomId) => {
        try {
            deleteRoom(roomId);
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onCommentsClick = () => {
        loadComments(hotelId);
        setShowCommentsBtn(false);
    };

    const onRepliesClick = (commentId) => {
        loadReplies(commentId);
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
                                {hideEditForm
                                    ? <div>
                                        <h2>{hotel.name}</h2>

                                        <div>
                                            <p>{hotel.description}</p>
                                            <span>Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</span>
                                            <span> | Favorited from {hotel.usersWhoFavoritedCount} people</span>
                                            {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                                        </div>

                                        <div>
                                            <span>{hotel.city.name}, {hotel.address}</span>
                                            <span> | Owner: {hotel.owner.firstName} {hotel.owner.lastName}</span>
                                            <span> | Rooms: {hotel.roomsCount}</span>
                                        </div>
                                    </div>
                                    : <AddEditHotelForm
                                        hotel={hotel}
                                        setCityId={setCityId}
                                        onChange={changeHandler}
                                        onSubmit={onUpdateHotelSubmit}
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
                                                onRepliesClick={onRepliesClick}
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
                            {hotel.rooms && hotel.rooms.map((room, roomIdx) =>
                                <form
                                    key={roomIdx}
                                    onSubmit={(e) => onCreateUpdateRoomSubmit(e, hotel.id, roomIdx)}
                                >
                                    <AddEditRoomDiv
                                        key={roomIdx}
                                        roomIdx={roomIdx}
                                        room={room}
                                        onChange={changeHandler}
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
                                <Button onClick={onAddRoomClick} name="Add Room" />
                            </div>
                        }
                    </div>
                )}
            </section>
        </main>
    );
};
