import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading="Trending" />
    </div>
  );
};

export default Home;
