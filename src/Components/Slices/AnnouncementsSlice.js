import { createSlice } from '@reduxjs/toolkit'

/**
 * Leftover from testing Redux 
 */
export const announcementsSlice = createSlice({
    name: 'announcementList',
    initialState: {
        list: [],
    },
    reducers: {
        fillList: (state, action) => {
            state.list = action.payload;
        }
    }
})

export const {fillList } = announcementsSlice.actions
export default announcementsSlice.reducer;