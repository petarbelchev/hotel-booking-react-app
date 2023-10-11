import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { getUserInfo } from "../services/usersService";

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
                    <p>First Name: {userInfo.firstName}</p>
                    <p>Last Name: {userInfo.lastName}</p>
                    <p>Trips: {userInfo.trips}</p>
                    <p>Owned Hotels: {userInfo.ownedHotels}</p>
                    <p>Favorite Hotels: {userInfo.favoriteHotels}</p>
                    <p>Comments: {userInfo.comments}</p>
                    <p>Replies: {userInfo.replies}</p>
                    <p>Ratings: {userInfo.ratings}</p>
                </div>
            </section>
        </main>
    );
}