import { configureStore, createSlice } from "@reduxjs/toolkit"
import youtubeSlice from './reducers/youtubeApp'


export const store = configureStore({
    reducer:{
        youtubeApp: youtubeSlice
    }
})