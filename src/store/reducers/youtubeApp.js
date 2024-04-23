import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {YOUTUBE_API_URL} from '../../utils/constants'
import axios from "axios"
import process from "process"
import { parseData, parseRecommendedData } from '../../utils/index'
import { parseVideoData } from "../../utils/parseVideoData.js"

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY1


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
      const parsedData = await parseData(items);
      return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
  );

  export const getSearchPageVideo = createAsyncThunk(
    "youtubeApp/searchPageVideos",
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

  export const getVideoDetails = createAsyncThunk(
    "yotubeApp/videoDetails",
    async (id) => {
      const {
        data: { items },
      } = await axios.get(
        `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
      );
  
      return parseVideoData(items[0]);
    }
  );

  export const getRecommendedVideos = createAsyncThunk(
    "yotubeApp/getRecommendedVideos",
    async (videoId, { getState }) => {
      const {
        youtubeApp: {
          currentPlaying: {
            channelInfo: { id: channelId },
          },
        },
      } = getState();
  
      const {
        data: { items },
      } = await axios.get(
        `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
      );
  
      const parsedData = await parseRecommendedData(
        items,
        videoId
      );
  
      return { parsedData };
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
        builder.addCase(getVideoDetails.fulfilled, (state, action) => {
          state.currentPlaying = action.payload;
        });
        builder.addCase(getRecommendedVideos.fulfilled, (state, action)=>{
            state.recommendedVideos = action.payload.parsedData;
        })
    }
})

export const { clearVideos, changeSearchTerm, clearSearchTerm } =youtubeSlice.actions
export default youtubeSlice.reducer;