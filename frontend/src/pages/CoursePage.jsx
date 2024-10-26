import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchCourseData from "../services/fetchCourseData";
import { makeYtEmbedLink } from "../util/util";

const CoursePage = () => {
  const { courseid } = useParams();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["courseData", courseid],
    () => fetchCourseData(courseid),
    {
      onSuccess: (data) => {
        setVideos(data.data.videos);
      },
    }
  );

  useEffect(() => {
    if (videos.length > 0) {
      setCurrentVideo(videos[0]);
    }
  }, [videos]);


  return (
    <div className="p-6 bg-base-200 flex">
      {/* Handle loading and error states separately */}
      {(isLoading || currentVideo == null) && <div className="container mx-auto flex lg:flex-row flex-col gap-6 skeleton">Loading...</div>}
      {isError && <div className="container mx-auto flex lg:flex-row flex-col gap-6">Error loading data.</div>}

      {/* Display course videos after data is fetched */}
      {(isFetched && currentVideo) && (
        <div className="container mx-auto flex lg:flex-row flex-col gap-6">
          {/* Video Player Section */}
          <div className="flex-grow flex flex-col items-center">
            <h2 className="text-3xl text-white font-semibold mb-6 text-center">
              {currentVideo.title}
            </h2>
            <div className="w-full md:w-[800px] h-[250px] md:h-[450px] aspect-w-16 aspect-h-9 bg-base-100 rounded-lg shadow-lg">
              <iframe
                title="Course Video"
                className="w-full h-full rounded-lg"
                src={makeYtEmbedLink(currentVideo.url)}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-4 text-neutral-content">
              Duration: {currentVideo.duration}
            </p>
          </div>

          {/* Scrollable Drawer for Videos */}
          <div className="w-full bg-base-100 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-neutral-content mb-4">
                Video Lessons
              </h2>
              <ul className="space-y-4">
              {videos.map((video, index) => (
                <li
                  key={index}
                  onClick={() => setCurrentVideo(video)}
                  className={`p-4 bg-base-100 rounded-lg shadow-lg flex justify-between items-center cursor-pointer hover:bg-gray-500 transition duration-300 ${
                    video.title === currentVideo.title ? 'bg-primary-focus text-white bg-base-300' : ''
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-bold">{video.title}</h3>
                    <p className="text-sm">Duration: {video.duration}</p>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
