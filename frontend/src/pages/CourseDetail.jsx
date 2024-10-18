import React from "react";

const CourseDetail = () => {
  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        {/* Course Header */}
        <div className="bg-base-100 md:h-44  relative rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            className="w-full h-full absolute object-cover z-0 brightness-50"
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f9981360ed304b477666954b42d5586f.png?auto=format%2Ccompress&dpr=2&w=562&h=221&q=40&fit=crop"
            alt="backgroundImage"
          />
          <div className="p-6 z-10 relative">
            <h1 className="text-4xl font-bold text-white">
              React for Beginners
            </h1>
            <p className="text-md text-neutral-content mt-2">
              Master the basics of React and build interactive web applications
            </p>
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
              This course provides a comprehensive introduction to React, one of
              the most popular JavaScript libraries for building modern web
              applications. You'll learn about React components, state, props,
              lifecycle methods, hooks, and more. This course is perfect for
              beginners who want to start their journey in web development with
              React.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              What You'll Learn:
            </h3>
            <ul className="list-disc list-inside text-neutral-content mb-4">
              <li>Building components in React</li>
              <li>Managing state and props</li>
              <li>Understanding the component lifecycle</li>
              <li>Using hooks like useState and useEffect</li>
              <li>Creating interactive user interfaces</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">
              Requirements:
            </h3>
            <p className="text-neutral-content">
              Basic knowledge of HTML, CSS, and JavaScript is recommended.
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
              <p className="text-neutral-content">John Doe</p>
            </div>

            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Duration:
              </p>
              <p className="text-neutral-content">12 hours (self-paced)</p>
            </div>

            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Difficulty Level:
              </p>
              <p className="text-neutral-content">Beginner</p>
            </div>

            <div className="mb-4">
              <p className="text-md font-semibold text-neutral-content">
                Language:
              </p>
              <p className="text-neutral-content">English</p>
            </div>

            {/* Enroll Button */}
            <button className="btn btn-primary w-full mt-4">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
