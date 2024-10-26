import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import fetchCourseDetailData from "../services/fetchCourseDetailData";
import { firstLetterUppercase, secToTimeFormat } from "../util/util";
import addToPurchase from "../services/addToPurchase";

const CourseDetail = () => {


  const {courseid} = useParams()
  const { showBoundary } = useErrorBoundary();

  const mutation = useMutation(addToPurchase, {
    onSuccess : (data) => {
      console.log(data);
    },
    onError : (data) => {
      console.log(data);
    }
  });

function handleEnroll (e){
  e.stopPropagation();
  mutation.mutate(courseid);
  refetch();
}

  const {data, isLoading, isError, isFetched, refetch} = useQuery(["courseData", courseid], () => fetchCourseDetailData(courseid), {
    cacheTime : 1000*60*10,
    staleTime :  1000*60*10
  })

  console.log(data)
  if (isLoading ){
    return (<div className="w-full h-screen p-6">
      <div className="w-full h-full skeleton">
      </div>
    </div>)
  }

  if (isError){
    showBoundary()
  }


  return (
    (isFetched && data) && <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        {/* Course Header */}
        <div className="bg-base-100 md:h-32  relative rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            className="w-full h-full absolute object-cover z-0 brightness-[0.3] blur-sm"
            src={data.data.imageLink || "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f9981360ed304b477666954b42d5586f.png?auto=format%2Ccompress&dpr=2&w=562&h=221&q=40&fit=crop"}
            alt="backgroundImage"
          />
          <div className="p-6 z-10 relative flex justify-center items-center">
            <h1 className="text-4xl font-bold text-white">
              {data.data.title || "Course Title"}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Details Section */}
          <div className="md:col-span-2 bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Course Overview
            </h2>
            <p className="text-neutral-content mb-4">
              {data.data.CourseOverview || "Course Overview"}
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              What You'll Learn:
            </h3>
            <ul className="list-disc list-inside text-neutral-content mb-4">
              {data.data.LearningObjectives.map((item, index) => <li key={index}>{item || `Learning Objective ${index + 1}`}</li>)}
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">
              Requirements:
            </h3>
            <p className="text-neutral-content">
             {data.data.Requirements || "Requirements"}
            </p>
          </div>

          {/* Course Information Section */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Course Information
            </h3>
            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Instructor:
              </p>
              <p className="text-neutral-content">{data.data.instructorName || "Unknown"}</p>
            </div>

            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Duration:
              </p>
              <p className="text-neutral-content">{secToTimeFormat(data.data.totalDuration) || "Unknown"} (self-paced)</p>
            </div>

            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Difficulty Level:
              </p>
              <p className="text-neutral-content">{firstLetterUppercase(data.data.DifficultyLevel)|| "Unknown"}</p>
            </div>

            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Language:
              </p>
              <p className="text-neutral-content">{data.data.Language || "Unknown"}</p>
            </div>

            {/* Enroll Button */}
            <button className="btn btn-primary w-full mt-4" disabled={data.data.purchased || false} onClick={handleEnroll}>{mutation.isLoading ? "Enrolling..." : `${data.data.purchased ? "Enrolled" : "Enroll Now"}`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
