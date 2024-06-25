import { createSlice } from '@reduxjs/toolkit';

export const pricesSlice = createSlice({
    name: 'prices',
    initialState: {
        hoodiePrice: 13500,
        pantsPrice: 7900,
        tshirtPrice: 4900,
    },
    reducers: {
        setHoodiePrice: (state, action) => {
            state.hoodiePrice = action.payload;
        },
        setPantsPrice: (state, action) => {
            state.pantsPrice = action.payload;
        },
        setTshirtPrice: (state, action) => {
            state.tshirtPrice = action.payload;
        },
    },
});

export const { setHoodiePrice, setPantsPrice, setTshirtPrice } = pricesSlice.actions;

export default pricesSlice.reducer;