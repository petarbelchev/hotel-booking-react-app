import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { HomePage } from "./pages/Home/HomePage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProfilePage } from "./components/UserProfilePage/UserProfilePage";
import { AddHotelPage } from "./pages/AddHotel/AddHotelPage";
import { HotelDetailsPage } from "./pages/HotelDetails/HotelDetailsPage";
import { SearchRoomsResultPage } from "./components/SearchRoomsResultPage/SearchRoomsResultPage";

import styles from "./App.module.css";

export default function App() {
    return (
        <>
            <div id={styles.contentWindow}>
                <AuthProvider>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/search-result" element={<SearchRoomsResultPage />} />
                            <Route path="/user-profile" element={<UserProfilePage />} />
                            <Route path="/add-hotel" element={<AddHotelPage />} />
                            <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
                        </Routes>
                    </main>
                </AuthProvider>
            </div>
            <Footer />
        </>
    );
};
