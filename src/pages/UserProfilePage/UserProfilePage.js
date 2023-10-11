import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { getUserInfo } from "../../services/usersService";

import "./UserProfilePage.css";

export function UserProfilePage() {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
            return await getUserInfo(user.id, user.token);
        }
        
        fetchData()
            .then(data => setUserInfo(data))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [user.id, user.token]);

    return (
        <main>
            <section>
                <h1>User Profile Page</h1>
                <div>
                    <p>First Name: <span>{userInfo.firstName}</span></p>
                    <p>Last Name: <span>{userInfo.lastName}</span></p>
                    <p>Trips: <span>{userInfo.trips}</span></p>
                    <p>Owned Hotels: <span>{userInfo.ownedHotels}</span></p>
                    <p>Favorite Hotels: <span>{userInfo.favoriteHotels}</span></p>
                    <p>Comments: <span>{userInfo.comments}</span></p>
                    <p>Replies: <span>{userInfo.replies}</span></p>
                    <p>Ratings: <span>{userInfo.ratings}</span></p>
                </div>
            </section>
        </main>
    );
}