import { createSlice } from "@reduxjs/toolkit";



const CarouselSlice = createSlice ({
    name: 'Carousel',
    initialState: {
        value: 1,
        length: 4,

    },
    reducers: {
        nextSlide: (state,action)=>{
            state.value = action.payload > state.length ? 1 : action.payload;
        },
        prevSlide: (state, action)=>{
            state.value = action.payload < 1 ? state.length : action.payload;
        },
        dotSlide: () =>{}
    }
});

export const carouselActions = CarouselSlice.actions;
export default CarouselSlice;