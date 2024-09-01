import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import CartSlice from "./slice/CartSlice";
import NotificationSlice from "./slice/NotificationSlice";
import ProductSlice from "./slice/ProductSlice";
import RegisterSlice from "./slice/RegisterSlice";
import OrderSlice from "./slice/OrderSlice";
import CarouselSlice from "./slice/CarouselSlice";
import CustomerSlice from "./slice/CustomerSlice";
import CouponSlice from "./slice/CouponSlice";

const MainStore = configureStore({
    reducer: {
        register: RegisterSlice.reducer,
        auth: AuthSlice.reducer,
        cart: CartSlice.reducer,
        notification: NotificationSlice.reducer,
        product: ProductSlice.reducer,
        order: OrderSlice.reducer,
        carousel: CarouselSlice.reducer,
        customer: CustomerSlice.reducer,
        coupon: CouponSlice.reducer,
    
    }, 
    
});

export default MainStore; 
