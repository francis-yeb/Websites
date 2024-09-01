import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const createCoupon = createAsyncThunk(
    'coupon/add', async (data, {rejectWithValue}) => {

        try {
            // console.log("data...",data);
            const request = await axios.post('api/coupons',data,{
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            });
            // console.log("coupon request", request);
            return request.data;

        }catch (error) {
            // console.log("coupon errors",error);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    coupon: null,
    selectedCoupon: null,
    coupons: [],
    type: null,
    appliedCouponResults: [],
    
}

const CouponSlice = createSlice({
    name: 'coupons',
    initialState: initialState,
    reducers: {
        allCoupons: (state,action) => {
            state.loading = false;
            state.error = null;
            state.coupons = action.payload;
        },

        singleCoupon: (state,action) => {
            state.loading = false;
            state.error = null;
            state.selectedCoupon = action.payload;
        },

        couponType: (state,action) => {
            state.loading = false;
            state.error = null;
            state.type = action.payload;
        },

        appliedCouponData: (state,action) => {
            state.loading = false;
            state.error = null;
            state.appliedCouponResults = action && action.payload;
        },

        removeCoupon: (state) => {
            state.loading =false;
            state.error = null;
            state.appliedCouponResults = [];
        },
        errors: (state,action) => {
            state.loading =false;
            state.error = action.payload;
        },

    },
    
    extraReducers: builder => {
        builder
        .addCase(createCoupon.pending, state => {
            state.loading = true;
            state.error = null;
            state.coupon = null;
        })
        .addCase(createCoupon.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.coupon = action && action.payload;
        })
        .addCase(createCoupon.rejected, (state, action) => {
            state.loading = false;
            state.coupon = null;

            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid credentials'
            }
            else {
                state.error = action.payload && action.payload.errors;
            }
        })

    
    }
});


export const couponActions = CouponSlice.actions;
export default CouponSlice;