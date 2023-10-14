import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProfilePage } from "./pages/UserProfilePage";
import { AddHotelPage } from "./pages/AddHotelPage";
import { HotelDetailsPage } from "./pages/HotelDetailsPage";

export default function App() {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search-result" element={<SearchResultPage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/add-hotel" element={<AddHotelPage />} />
                <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
            </Routes>
        </AuthProvider>
    );
};
