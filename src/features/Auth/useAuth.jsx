import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm"

const getRegisterForm = () => <RegisterForm />;
const getLoginForm = () => <LoginForm />;

export function useAuth() {
    return { getRegisterForm, getLoginForm };
};