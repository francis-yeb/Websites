import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
//Register user
export const registerUser = createAsyncThunk(
    'user/register', async(data,{rejectWithValue}) => {
        try {
            const request = await axios.post('/register', data);
            const response = await request.data;
            // localStorage.setItem('user',JSON.stringify(response));
            // console.log('user sent local storage from register: ',response)
            return response;
        }catch (error) {
            console.log("create asy error: ",error)
            // return rejectWithValue(error.response)
            return rejectWithValue(error.response.data)
        }
    }
);

// const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const userFromLocalStorage = JSON.parse(sessionStorage.getItem('user'));
console.log('user get from local storage from register: ',userFromLocalStorage)

const RegisterSlice = createSlice({
    name: 'register',
    initialState: {
        // user: !!userFromLocalStorage || null,
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
        .addCase(registerUser.pending, (state) =>{
            state.loading = true;
            state.error = null;
            state.user = null;
        })
        .addCase(registerUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload && action.payload;
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.loading =false;
            state.user = false;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid credentials';
            } 
            else {
                state.error = action.payload && action.payload.errors;

            }
        });

    }
});


export const registerActions = RegisterSlice.actions;

export default RegisterSlice;