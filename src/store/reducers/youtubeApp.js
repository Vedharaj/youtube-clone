import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {YOUTUBE_API_URL} from '../../utils/constants'
import axios from "axios"
import process from "process"
import { parseData } from '../../utils/index'

// const API_KEY = process.env.YOUTUBE_DATA_API_KEY2
const API_KEY = "AIzaSyBOLUolpgyexsLm_ehOkYndagxpBHxmP4A"

const initialState = {
    videos:[],
    currentPlaying:null,
    searchTerm:"",
    searchResults:[],
    nextPageToken:null,
    recommendedVideos:[]
}

export const getHomePageVideo = createAsyncThunk(
    "youtubeApp/homePageVidoes",
    async (isNext, { getState }) => {
      const {
        youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
      } = getState();
      const {
        data: { items, nextPageToken },
      } = await axios.get(
        `${YOUTUBE_API_URL}/search?maxResults=20&q="zendaya"&key=${API_KEY}&part=snippet&type=video&${
          isNext ? `pageToken=${nextPageTokenFromState}` : ""
        }`
      );
      console.log({ items, nextPageTokenFromState, nextPageToken });
      const parsedData = await parseData(items);
      return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
  );

  export const getSearchPageVideo = createAsyncThunk(
    "youtubeApp/serachPageVideos",
    async (isNext, { getState }) => {
      const {
        youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
      } = getState();
      const {
        data: { items, nextPageToken },
      } = await axios.get(
        `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
          isNext ? `pageToken=${nextPageTokenFromState}` : ""
        }`
      );
      const parsedData = await parseData(items);
      return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
  );

const youtubeSlice = createSlice({
    name: 'youtubeApp',
    initialState,
    reducers:{
        clearVideos: (state)=>{
            state.videos = [];
            state.nextPageToken=null;
        },
        changeSearchTerm: (state, action)=>{
            state.searchTerm = action.payload
        },
        clearSearchTerm: (state)=>{
            state.searchTerm = ""
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getHomePageVideo.fulfilled, (state, action)=>{
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken;
            // console.log(action.payload.nextPageToken)
        }),
        builder.addCase(getSearchPageVideo.fulfilled, (state, action)=>{
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken;
        })
    }
})

export const { clearVideos, changeSearchTerm, clearSearchTerm } =youtubeSlice.actions
export default youtubeSlice.reducer;