import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";
import { AddHotelPage } from "./pages/AddHotelPage";
import { HotelDetailsPage } from "./pages/HotelDetailsPage/HotelDetailsPage";
import { SearchRoomsResultPage } from "./pages/SearchRoomsResultPage";

export default function App() {
    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <div style={{ paddingBottom: "2.5rem" }}>
                <AuthProvider>
                    <Header />
                    <div style={{margin: "30px"}}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/search-result" element={<SearchRoomsResultPage />} />
                            <Route path="/user-profile" element={<UserProfilePage />} />
                            <Route path="/add-hotel" element={<AddHotelPage />} />
                            <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
                        </Routes>
                    </div>
                </AuthProvider>
            </div>
            <Footer />
        </div>
    );
};
