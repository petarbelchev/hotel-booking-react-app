import { useContext } from "react";

import { Dropdown } from "../../../../components/Dropdown/Dropdown"
import { AuthContext } from "../../../../contexts/AuthContext";

import styles from "./HotelDiv.module.css";

export function HotelDiv({
    hotel,
    favoriteButton,
    onEditHotelClickHandler,
    onDeleteHotelClickHandler,
    onManageRoomsClickHandler,
    onAddImageClickHandler,
    ratingDiv
}) {
    const { user } = useContext(AuthContext);
    const isOWner = user?.id === hotel.owner?.id;

    return (
        <div>
            <div className={styles.title}>
                <h2>{hotel.name}</h2>

                {user &&
                    <>
                        {favoriteButton}

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

            {user && ratingDiv}

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
        </div>
    );
};