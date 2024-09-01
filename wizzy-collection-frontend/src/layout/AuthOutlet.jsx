import { Navigate, Outlet, } from "react-router-dom";
import useAuthActions from "../redux/useHooks/useAuthActions";

export const UserLayout = () => {
    const { isLoggedIn,user } = useAuthActions();
    if(isLoggedIn){
        if(user.role === 'user'){
            return <Outlet/>;
        }
        else {
            return <Navigate to="/dashboard"/>
        }
    }else {
        return <Navigate to="/login"/>
    }
}

export const AdminLayout = () => {
    const { isLoggedIn,user } = useAuthActions();
    if(isLoggedIn){
        if(user.role === 'admin'){
            return <Outlet/>;
        }
        else {
            return <Navigate to="/"/>
        }
    }else {
        return <Navigate to="/login"/>
    }
    // return isLoggedIn &&user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
}
export const NotAdminLayout = () => {
    const { isLoggedIn,user } = useAuthActions();
    if(isLoggedIn || !isLoggedIn){
        if(user&&user.role !== 'admin' || !user){
            return <Outlet/>;
        }
        else {
            return <Navigate to="/dashboard"/>
        }
    }
    // else {
    //     return <Navigate to="/login"/>
    // }
    // return isLoggedIn &&user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
}
export const AuthLayout = () => {
    const { isLoggedIn,user } = useAuthActions();
    if(isLoggedIn){
        return <Outlet/>;
    }else {
        return <Navigate to="/login"/>
    }
    // return isLoggedIn &&user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
}

// export default UserLayout;
