import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import useAuthActions from "../redux/useHooks/useAuthActions";
import {AdminLayout, UserLayout, AuthLayout, NotAdminLayout} from "../layout/AuthOutlet";
import GuestLayout from "../layout/GuestLayout";
import ProductDetail from "./ProductDetail";
import CartPage from "../pages/CartPage";
import MyAccount from "../pages/MyAccount";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import AllProducts from "../pages/admin pages/AllProducts";
import Customers from "../pages/admin pages/Customers";
import PageNotFound from "../pages/PageNotFound";
import AllCategory from "../pages/admin pages/AllCategory";
import CheckOut from "../pages/CheckOut";
import CustomerOrder from "../pages/CustomerOrder";
import AllCoupons from "../pages/admin pages/AllCoupons";
import AllOrders from "../pages/admin pages/AllOrders";


export const MyRoutes = () => {
    const {isLoggedIn} = useAuthActions()
    return (

        <Routes>
            <Route element = {<NotAdminLayout/>}>
                <Route path="/cart" element={<CartPage />} />
                <Route index path="/" element={<Home />} />
            </Route>
                <Route path="/products/:productId" element={<ProductDetail />} />

            <Route element = {<GuestLayout/>}>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password-reset/:token" element={<ResetPassword />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
            </Route>
            <Route element = {<AuthLayout/>}>
                <Route path="/verify-email/:userId" element={<VerifyEmail />} />
                <Route path="/users/:userId" element={<MyAccount />} />
                
            </Route>

                
            <Route element={<UserLayout/>}>
                <Route path="/check-out" element={<CheckOut/>} />
                <Route path="/customer/orders" element={<CustomerOrder/>} />
            </Route>
            
            <Route element={<AdminLayout/>}>
                <Route index path="/dashboard" element={<Dashboard/>}/>
                <Route path="/products" element={<AllProducts/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/category" element={<AllCategory/>}/>
                <Route path="/coupons" element={<AllCoupons/>}/>
                <Route path="/admin/customer/orders" element={<AllOrders/>}/>
            </Route>
            <Route path="*" element={<PageNotFound/>}>404 Not Found</Route>
    </Routes>
    );
}