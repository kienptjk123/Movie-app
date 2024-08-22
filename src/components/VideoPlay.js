import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  // Kiểm tra xem videoData và videoData.results có hợp lệ không
  const videoKey = videoData?.results?.[0]?.key;

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button
          onClick={close}
          className="absolute -right-1 -top-6 text-3xl z-50"
        >
          <IoClose />
        </button>

        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            className="w-full h-full"
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="text-white text-center">No video available</p>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
