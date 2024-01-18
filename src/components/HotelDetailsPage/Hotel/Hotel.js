import { FavoriteButton } from "../../Buttons/FavoriteButton";
import { Dropdown } from "../../Dropdown/Dropdown"
import styles from "./Hotel.module.css";

export function Hotel({
    hotel,
    onFavoriteClickHandler,
    onEditHotelClickHandler,
    onDeleteHotelClickHandler,
    onManageRoomsClickHandler,
    onAddImageClickHandler,
    RatingDiv,
    userId,
    children,
}) {
    const isOWner = userId === hotel.owner?.id;

    return (
        <div>
            <div className={styles.title}>
                <h2>{hotel.name}</h2>

                {userId &&
                    <>
                        <FavoriteButton
                            hotelId={hotel.id}
                            onClick={onFavoriteClickHandler}
                            isPressed={hotel.isUserFavoriteHotel}
                        />

                        {isOWner &&
                            <Dropdown
                                menuImage={<img
                                    src={process.env.PUBLIC_URL + "/edit.png"}
                                    style={{ width: "25px" }}
                                    alt="Edit button"
                                />}
                                buttons={[
                                    {
                                        name: "Edit Hotel",
                                        onClick: onEditHotelClickHandler,
                                    },
                                    {
                                        name: "Manage Rooms",
                                        onClick: onManageRoomsClickHandler,
                                    },
                                    {
                                        name: "Add Image",
                                        onClick: onAddImageClickHandler,
                                    },
                                    {
                                        name: "Delete Hotel",
                                        onClick: onDeleteHotelClickHandler,
                                    },
                                ]}
                            />
                        }
                    </>
                }
            </div>

            {RatingDiv}

            <div>
                <p>{hotel.description}</p>
                <span>Rating: {hotel.ratings?.rating} from {hotel.ratings?.ratingsCount} votes</span>

                {hotel.usersWhoFavoritedCount > 0 &&
                    <span> | Favorited from {hotel.usersWhoFavoritedCount} people</span>
                }
            </div>

            <div>
                <span>
                    {hotel.city?.name}
                    {hotel.address && `, ${hotel.address}`}
                </span>

                {hotel.owner &&
                    <>
                        <span> | Owner: {hotel.owner?.firstName} {hotel.owner?.lastName}</span>
                        <span> | Rooms: {hotel.roomsCount}</span>
                    </>
                }
            </div>

            {children}
        </div>
    );
};