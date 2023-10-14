import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { deleteUserProfile, getUserInfo, updateUserProfile } from "../services/usersService";
import { useNavigate } from "react-router-dom";

export function UserProfilePage() {
    const { user, addUser, removeUser } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [hideEditForm, setHideEditForm] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo(user.id, user.token)
            .then(data => setUserInfo(data))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [user.id, user.token]);

    function onClickUpdate(e) {
        setHideEditForm(false);
    }

    function onClickDelete(e) {
        e.preventDefault();

        // TODO: Use modal window instead of 'confirm()'.
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete your profile?')) {
            deleteUserProfile(
                user.id,
                user.token
            ).then(response => {
                if (response.status === 204) {
                    alert('Your profile was successfully deleted!');
                    removeUser();
                    navigate('/');
                }
            }).catch(error => alert(`${error.status} ${error.title}!`)); // TODO: Render validation errors.
        }
    }

    function onClickCancel(e) {
        setHideEditForm(true);
    }

    function onUpdateSubmit(e) {
        e.preventDefault();
        const userData = Object.fromEntries(new FormData(e.target));

        updateUserProfile(
            user.id,
            userData,
            user.token
        ).then(data => {
            setUserInfo(state => ({
                ...state,
                ...data,
            }));

            addUser({
                ...user,
                firstName: data.firstName,
                lastName: data.lastName
            });
        }).catch(error => alert(`${error.status} ${error.title}!`)); // TODO: Render validation errors inside the update form.

        setHideEditForm(true);
    }

    return (
        <main>
            <section>
                <h1>User Profile Page</h1>
                <div>
                    {hideEditForm
                        ? <>
                            <p>First Name: {userInfo.firstName}</p>
                            <p>Last Name: {userInfo.lastName}</p>
                            <p>Phone Number: {userInfo.phoneNumber}</p>
                        </>
                        : <>
                            <form onSubmit={onUpdateSubmit}>
                                <div>
                                    <label htmlFor="firstName">First Name:</label>
                                    <input type="text" id="firstName" name="firstName" defaultValue={userInfo.firstName} />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input type="text" id="lastName" name="lastName" defaultValue={userInfo.lastName} />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <input type="text" id="phoneNumber" name="phoneNumber" defaultValue={userInfo.phoneNumber} />
                                </div>
                                <div>
                                    <button type="submit">Update</button>
                                    <button onClick={onClickCancel}>Cancel</button>
                                </div>
                            </form>
                        </>}
                    <p>Trips: {userInfo.trips}</p>
                    <p>Owned Hotels: {userInfo.ownedHotels}</p>
                    <p>Favorite Hotels: {userInfo.favoriteHotels}</p>
                    <p>Comments: {userInfo.comments}</p>
                    <p>Replies: {userInfo.replies}</p>
                    <p>Ratings: {userInfo.ratings}</p>
                </div>
            </section>
            <section>
                <button onClick={onClickUpdate}>Update Your Profile</button>
                <button onClick={onClickDelete}>Delete Your Profile</button>
            </section>
        </main>
    );
}