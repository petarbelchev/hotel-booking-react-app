import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { DangerButton } from "../../components/Buttons/DangerButton";
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
import styles from "./HotelDetailsPage.module.css";

export function HotelDetailsPage() {
    const [hotel, setHotel] = useState({});
    const [hideEditHotelForm, setHideEditHotelForm] = useState(true);
    const [showEditHotelBtn, setShowEditHotelBtn] = useState(true);

    const { user } = useContext(AuthContext);
    const { hotelId } = useParams();
    const navigate = useNavigate();

    const hooks = {
        cities: useCities(),
        mainImage: useImage(hotel.mainImageId),
        hotelForm: useForm({}),
    };

    const isOwner = hotel.owner?.id === user?.id;

    useEffect(() => {
        hotelId && getHotel(hotelId, user?.token)
            .then(hotelData => setHotel(state => ({ ...state, ...hotelData })))
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

    return (
        <main>
            <section>
                <h1>Hotel Details</h1>

                <div className={styles.solidBorder}>
                    <div className={styles.flexWrap}>
                        {hooks.mainImage &&
                            <div><Image src={hooks.mainImage} alt={hotel.name} /></div>
                        }

                        <div>
                            <div className={styles.flexWrap}>
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

                                {isOwner &&
                                    <div>
                                        {showEditHotelBtn &&
                                            <PrimaryButton onClick={editHotelClickHandler} name="Edit Hotel" />
                                        }
                                        <DangerButton onClick={deleteHotelClickHandler} name="Delete Hotel" />
                                    </div>
                                }
                            </div>

                            <CommentsDiv
                                hotelId={hotelId}
                                commentsCount={hotel.commentsCount}
                                increaseCommentsCountHandler={increaseCommentsCountHandler}
                                decreaseCommentsCountHandler={decreaseCommentsCountHandler}
                            />
                        </div>
                    </div>

                    {isOwner &&
                        <div>
                            <hr />
                            <RoomsDiv
                                hotelId={hotelId}
                                roomsCount={hotel?.roomsCount}
                                token={user.token}
                                increaseRoomsCountHandler={increaseRoomsCountHandler}
                                decreaseRoomsCountHandler={decreaseRoomsCountHandler}
                            />
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};
