import { createSlice } from "@reduxjs/toolkit"


let initialState = {
    loading: false,
    error: null,
    order: null,
    status: null,
    ordercategory: null,
    userOrders: null,
}

const OrderSlice = createSlice({
    name: 'Orders',
    initialState: initialState,
    reducers: {
        payment: (state,action) => {
            state.order = action.payload;
        },
        getOrderStatus: (state,action) => {
            state.status = action.payload;
        },
        getOrderCategory: (state,action) => {
            state.ordercategory = action.payload;
        },
        userOrders: (state,action) => {
            state.userOrders = action.payload;
        }
        ,
        removeOrderCategory: state => {
            state.ordercategory = null;
        },
        
        
    }
});

export const orderActions = OrderSlice.actions;
export default OrderSlice;