import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";


//Login user
export const loginUser = createAsyncThunk(
    'user/login', async(data, {rejectWithValue})=> {
        try {
            const request = await axios.post('/login', data);
            const response = await request.data;
            return response;
        }catch (error) {
            return rejectWithValue(error.response.data)
        }
       
    }
)

//Get data from the local storage
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
// const userFromLocalStorage = JSON.parse(sessionStorage.getItem('user'));

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: !!userFromLocalStorage || false,
        user: userFromLocalStorage ||  null,
        userData: null,
        verified: false,
        loading: false,
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload
        },

        logout: (state) => {
            state.isLoggedIn = false;
            
            state.user = null;
        },
        user: (state,action) => {
            state.userData = action.payload;
        },
        userInfo: (state,action) => {
            state.userData = action.payload;
        },
        verifiedUser: (state) => {
            state.verified = true
        },
        loading: (state,action) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending,state=>{
                state.loading =true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state,action)=>{
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                // console.log("Login user fulfilled payload: ", action.payload);
            })
            .addCase(loginUser.rejected, (state,action)=>{
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

export const authActions = AuthSlice.actions;

export default AuthSlice;