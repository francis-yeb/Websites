import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {counter: 0},
    reducers: {
        increment: (state,action) => {
            return {counter: state.counter + 1}
        },

        decrement: (state, action) => {
            return {counter: state.counter - 1}
        },

        addBy: (state, action) => {
            return {counter: state.counter + action.payload}
        }
    }
});

export const actions = counterSlice.actions;

const store = configureStore({
    reducer: counterSlice.reducer
});

export default store;