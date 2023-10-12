import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { getUserInfo, updateUserProfile } from "../services/usersService";

export function UserProfilePage() {
    const { user, addUser } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [hideEditForm, setHideEditForm] = useState(true);

    useEffect(() => {
        getUserInfo(user.id, user.token)
            .then(data => setUserInfo(data))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [user.id, user.token]);

    function onClickUpdate(e) {
        setHideEditForm(false);
    }

    function onClickCancel(e) {
        setHideEditForm(true);
    }

    function onUpdateSubmit(e) {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.target));

        updateUserProfile(
            user.id,
            JSON.stringify(body),
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
                <button>Delete Your Profile</button> {/* // TODO: Implement the deletion of the user profile. */}
            </section>
        </main>
    );
}