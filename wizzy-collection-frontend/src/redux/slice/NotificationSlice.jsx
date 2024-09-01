import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        // type: "",
        // message: ""
        notification: null
    },
    reducers: {
        // showNotification: (state,action) => {
        //     const {type, message} = action.payload;
        //     state.type = type;
        //     state.message = message;
        // },
        showNotification: (state,action) => {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open,
            }
        },

        hideNotification: (state) => {
            state.notification = null;
        }
    }
});

export const notificationActions = NotificationSlice.actions;
export default NotificationSlice;