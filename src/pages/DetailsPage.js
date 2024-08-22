import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Devider from "../components/Devider";
import useFetch from "../hooks/useFetch";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const duration = (data?.runtime / 60).toFixed(1).split(".");
  const writer =
    Array.isArray(castData?.crew) && castData.crew.length > 0
      ? castData.crew
          .filter((el) => el?.job === "Writer")
          .map((el) => el?.name)
          .join(", ") || "Unknow"
      : "Unknow";

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  // console.log("write", writer);
  console.log("data", data);
  console.log("star cast", castData);

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data.backdrop_path}
            alt="img"
            className="h-full object-cover w-full"
          />
        </div>

        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container px-3 py-16 mx-auto lg:py-0 flex flex-col lg:gap-10 lg:flex-row gap-5">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
            alt=""
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>

        <div className="pr-3">
          <h2 className="text-4xl font-bold">{data?.title || data?.name}</h2>
          <p className="font-thin">{data?.tagline}</p>

          <Devider />

          <div className="flex gap-3 my-3 text-center">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {data?.vote_count}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Devider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
          </div>

          <Devider />

          <div className="flex gap-3 my-3 text-center">
            <p>Status: {data?.status}</p>
            <span>|</span>
            <p>
              Release Date: {moment(data?.release_date).format("MMMM Do YYYY")}
            </p>
            <span>|</span>
            <p>Revenue: {data?.revenue}</p>
          </div>

          <Devider />

          <div>
            <p className="text-white">
              Director<span> : {castData?.crew?.[0]?.name || "Unknow"}</span>
            </p>

            <Devider />

            <p>
              <span>Writer : {writer}</span>
            </p>
          </div>

          <Devider />

          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((startCast, index) => {
                return (
                  <div>
                    <div>
                      <img
                        src={imageURL + startCast?.profile_path}
                        alt=""
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-sm text-center text-neutral-400">
                      {startCast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation " + params?.explore}
          media_type={params?.explore}
        />
      </div>

      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
