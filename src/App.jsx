import { Routes, Route } from 'react-router-dom';

import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { AuthProvider } from 'contexts/AuthContext';

import { HomePage } from 'pages/Home';
import { RegisterPage } from 'pages/Register';
import { LoginPage } from 'pages/Login';
import { AddHotelPage } from 'pages/AddHotel';
import { HotelDetailsPage } from 'pages/HotelDetails';
import { UserProfilePage } from 'pages/UserProfile';
import { SearchRoomsResultPage } from 'pages/SearchRoomsResult';

import styles from './App.module.css';

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
