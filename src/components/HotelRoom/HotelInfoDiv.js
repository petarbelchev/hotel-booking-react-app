import { Image } from "../Image";
import { DropdownMenu } from "../Dropdowns/DropdownMenu"

import styles from "./HotelInfoDiv.module.css";

export function HotelInfoDiv({
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
    return (
        <div>
            <div className={styles.title}>
                <h2>{hotel.name}</h2>

                {userId &&
                    <>
                        <span onClick={() => onFavoriteClickHandler(hotel.id)} className={styles.favoriteBtn}>
                            <Image
                                src={process.env.PUBLIC_URL + (hotel.isUserFavoriteHotel ? '/full-heart.png' : '/empty-heart.png')}
                                alt="Favorite hotel icon"
                            />
                        </span>

                        {userId === hotel.owner?.id &&
                            <DropdownMenu
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