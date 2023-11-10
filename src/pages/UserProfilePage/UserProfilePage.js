import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { InputField } from "../../components/InputField";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../../services/usersService";

import styles from "./UserProfilePage.module.css";

export function UserProfilePage() {
    const navigate = useNavigate();
    const { form, setForm, formChangeHandler } = useForm();
    const { user, addUser, removeUser } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState({});
    const [hideEditForm, setHideEditForm] = useState(true);

    useEffect(() => {
        getUserProfile(user.id, user.token)
            .then(data => {
                setUserProfile(data);

                setForm({
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    phoneNumber: userProfile.phoneNumber,
                });
            })
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [
        user.id,
        user.token,
        setForm,
        userProfile.firstName,
        userProfile.lastName,
        userProfile.phoneNumber,
    ]);

    const updateClickHandler = () => setHideEditForm(false);
    const cancelClickHandler = () => setHideEditForm(true);

    const clickDeleteHandler = async () => {
        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete your profile?')) {
            try {
                const response = await deleteUserProfile(user.id, user.token);

                if (response.status === 204) {
                    alert('Your profile was successfully deleted!');
                    removeUser();
                    navigate('/');
                }
            } catch (error) {
                // TODO: Render validation errors.
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    const updateSubmitHandler = async (e) => {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to update your profile?')) {
            try {
                const responseData = await updateUserProfile(user.id, form, user.token);

                setUserProfile(state => ({
                    ...state,
                    ...responseData,
                }));

                addUser({
                    ...user,
                    firstName: responseData.firstName,
                    lastName: responseData.lastName
                });

                setHideEditForm(true);
            } catch (error) {
                // TODO: Render validation errors inside the update form.
                alert(`${error.status} ${error.title}!`);
            }
        }
    };

    return (
        <section className={styles.container}>
            <h1>User Profile Page</h1>
            <div className={styles.content}>
                {hideEditForm
                    ? <>
                        <div>
                            <span>First Name: </span>
                            <span>{userProfile.firstName}</span>
                        </div>
                        <div>
                            <span>Last Name: </span>
                            <span>{userProfile.lastName}</span>
                        </div>
                        <div>
                            <span>Phone Number: </span>
                            <span>{userProfile.phoneNumber}</span>
                        </div>
                    </>
                    : <>
                        <form onSubmit={updateSubmitHandler}>
                            <InputField
                                labelName="First Name"
                                type="text"
                                paramName="firstName"
                                value={form.firstName}
                                onChange={formChangeHandler}
                                required={true}
                            />
                            <InputField
                                labelName="Last Name"
                                type="text"
                                paramName="lastName"
                                value={form.lastName}
                                onChange={formChangeHandler}
                                required={true}
                            />
                            <InputField
                                labelName="Phone Number"
                                type="text"
                                paramName="phoneNumber"
                                value={form.phoneNumber}
                                onChange={formChangeHandler}
                                required={true}
                            />
                            <div>
                                <PrimaryButton type="submit" name="Update" />
                                <PrimaryButton onClick={cancelClickHandler} name="Cancel" />
                            </div>
                        </form>
                    </>
                }
                <div>
                    <span>Trips: </span>
                    <span>{userProfile.trips}</span>
                </div>
                <div>
                    <span>Owned Hotels: </span>
                    <span>{userProfile.ownedHotels}</span>
                </div>
                <div>
                    <span>Favorite Hotels: </span>
                    <span>{userProfile.favoriteHotels}</span>
                </div>
                <div>
                    <span>Comments: </span>
                    <span>{userProfile.comments}</span>
                </div>
                <div>
                    <span>Replies: </span>
                    <span>{userProfile.replies}</span>
                </div>
                <div>
                    <span>Ratings: </span>
                    <span>{userProfile.ratings}</span>
                </div>
                <div>
                    <PrimaryButton onClick={updateClickHandler} name="Update Your Profile" />
                    <PrimaryButton onClick={clickDeleteHandler} name="Delete Your Profile" />
                </div>
            </div>
        </section>
    );
}