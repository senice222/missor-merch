import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    active: {
        country: 'Россия',
        currency: 'RUB'
    }
}

export const RegionSlice = createSlice({
    name: 'Region',
    initialState,
    reducers: {
        changeRegion: (state, action) => {
            state.active = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeRegion } = RegionSlice.actions

export default RegionSlice.reducer