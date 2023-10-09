import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search-result" element={<SearchResultPage />} />
            </Routes>
        </AuthProvider>
    );
};
