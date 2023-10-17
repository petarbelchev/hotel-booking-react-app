import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { AddEditHotelDiv } from "../components/AddEditHotelDiv";
import { Button } from "../components/Button";
import { AddEditRoomDiv } from "../components/AddEditRoomDiv";

import { useImage } from "../hooks/useImage";
import { useHotel } from "../hooks/useHotel";

import { AuthContext } from "../contexts/AuthContext";

export function HotelDetailsPage() {
    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();

    const { hotel, changeHandler, loadRooms, saveRoom, saveHotel, setCityId } = useHotel({
        name: '',
        address: '',
        cityId: 0,
        description: '',
        city: {},
        ratings: {},
        owner: {},
        rooms: [],
    }, hotelId);

    const mainImage = useImage(hotel && hotel.mainImageId);
    const [hideEditForm, setHideEditForm] = useState(true);
    const isOwner = hotel.owner && hotel.owner.id === user.id;

    const onEditClick = () => setHideEditForm(false);
    const onCancelClick = () => setHideEditForm(true);

    const onUpdateHotelClick = () => {
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

    const onEditRoomsClick = (e) => {
        try {
            loadRooms();
            e.target.style.display = "none";
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    const onUpdateRoomClick = (roomIdx) => {
        const room = hotel.rooms[roomIdx];

        try {
            saveRoom(roomIdx, room);
            alert('The room was successfully updated!');
        } catch (error) {
            alert(`${error.status} ${error.title}!`);
        }
    };

    return (
        <main>
            <section>
                <h1>Hotel Details</h1>

                {hotel && (
                    <div style={{ borderStyle: "solid", margin: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "space-around", margin: "10px" }}>
                            <div style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
                                {mainImage && <img src={mainImage} alt="Hotel." />}
                            </div>

                            {hideEditForm
                                ? <div>
                                    <h2>{hotel.name}</h2>
                                    <p>{hotel.city.name}, {hotel.address}</p>
                                    <p>{hotel.description}</p>
                                    <p>Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</p>
                                    <p>Rooms: {hotel.roomsCount}</p>
                                    <p>Owner: {hotel.owner.firstName} {hotel.owner.lastName}</p>
                                    <p>Favorited from {hotel.usersWhoFavoritedCount} people</p>
                                    {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                                    {isOwner && <div><Button onClick={onEditClick} name="Edit Hotel" /></div>}
                                </div>
                                : <AddEditHotelDiv
                                    hotel={hotel}
                                    onChange={changeHandler}
                                    setCityId={setCityId}
                                >
                                    <div>
                                        <Button onClick={onCancelClick} name="Cancel" />
                                        <Button onClick={onUpdateHotelClick} name="Update Hotel" />
                                    </div>
                                </AddEditHotelDiv>
                            }

                            {hotel.rooms && hotel.rooms.map((room, index) =>
                                <AddEditRoomDiv
                                    key={room.id}
                                    roomIdx={index}
                                    room={room}
                                    onChange={changeHandler}
                                >
                                    <Button onClick={() => onUpdateRoomClick(index)} name="Update Room" />
                                </AddEditRoomDiv>)
                            }


                            {isOwner && hotel.roomsCount > 0 &&
                                <div><Button onClick={onEditRoomsClick} name="Edit Rooms" /></div>
                            }
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};
