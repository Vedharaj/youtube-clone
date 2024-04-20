import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCard from "../components/SearchCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearVideos, getSearchPageVideo } from "../store/reducers/youtubeApp";

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {videos, searchTerm} = useSelector((store)=>store.youtubeApp)

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideo(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideo(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((item) => {
                return (
                  <div className="my-5">
                    <SearchCard data={item} key={item.videoId} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}