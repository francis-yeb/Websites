import { Navigate, Outlet } from "react-router-dom";
import useAuthActions from "../redux/useHooks/useAuthActions";

const GuestLayout = () => {
    const {isLoggedIn} = useAuthActions();
    return !isLoggedIn? <Outlet /> : <Navigate to="/"/>;
}

export default GuestLayout