import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/axios'
//Add product
export const addNewProduct = createAsyncThunk(
    'product/add', async (data, {rejectWithValue}) => {
       
        try {
            const request = await axios.post('/api/products',data,{
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });
            const response = await request.data;
            return response;
        }catch (error) {
            // console.log("Add new product ", error);
            return rejectWithValue(error.response.data)
        }
    } 
);


const initialState = {
    loading: false,
    error: null,
    product: null,
    allProducts: [ ],
    selectedProduct: null,
    productSize: null,
    productCategories: null,
    productGenders: null,
    categoryProducts: null,
}

const ProductSlice = createSlice({
    name: 'Products',
    initialState: initialState,
    reducers: {
        allProducts: (state,action) => {
            state.allProducts = action.payload
        },
        allCategoryProducts: (state,action) => {
            state.categoryProducts = action.payload
        },

        selectedProduct: (state,action) => {
            state.selectedProduct =  action.payload;
        },
        removeSelectedProduct: (state)=>{
            state.selectedProduct = null;
        },
        productCategory: (state,action) => {
            state.productCategories = action.payload
        },
        removeProductCategory: state => {
            state.categoryProducts = null;
        },
        productGender: (state,action) => {
            state.productGenders = action.payload
        }
        ,
        productSizes: (state,action) => {
            state.productSize = action.payload
        },
        updateProduct:(state) => {
            state.loading = true
        }
    },
    extraReducers: builder => {
        builder
        .addCase(addNewProduct.pending, state => {
            state.loading = true;
            state.error = null;
            state.product = null;
        })
        .addCase(addNewProduct.fulfilled, (state,action)=> {
            state.loading = false;
            state.error = null;
            state.product = action && action.payload;
        })
        .addCase(addNewProduct.rejected, (state,action) => {
            state.loading =false;
            state.product = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid credentials';
            } 
            else {
                state.error = action.payload && action.payload.errors;

            }
        })
    }
});

export const productActions = ProductSlice.actions;
export default ProductSlice;