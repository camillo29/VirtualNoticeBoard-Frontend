import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from './Components/Slices/AnnouncementsSlice'
export default configureStore({
    reducer: {
        announcementList: announcementReducer,    
    },
})
