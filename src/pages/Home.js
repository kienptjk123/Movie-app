import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRating } = useFetch("/movie/top_rated");
  const { data: popularTV } = useFetch("/tv/popular");
  const { data: onTheAir } = useFetch("/tv/on_the_air");

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingData}
        heading="Trending"
        trending={true}
      />
      <HorizontalScrollCard
        data={nowPlayingData}
        heading={"Trending"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={topRating}
        heading={"Top Rated Movies"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={popularTV}
        heading={"Popular TV Shows"}
        media_type={"tv"}
      />
      <HorizontalScrollCard
        data={onTheAir}
        heading={"On The Air"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
