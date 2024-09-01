import { createSlice } from "@reduxjs/toolkit"


const CustomerSlice = createSlice({
    name: 'customer',
    initialState: {
        loading: true,
        error: null,
        customer: null,
        selectedCustomer: null,
        allCustomers: [],
    }, 
    reducers: {
        allCustomers: (state, action) => {
            state.loading = false;
            state.error = null;
            state.allCustomers = action.payload;
        },
        selectedCustomer: (state, action) => {
            state.loading = false;
            state.error = null;
            state.selectedCustomer = action.payload;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
        errors: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const customerActions = CustomerSlice.actions;
export default CustomerSlice;