import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const AddCourseForm2 = ({
  mutation2,
  handleFechCourseDetail,
  setFormNumber,
  courseOverview,
  setCourseOverview,
  learningObjectives,
  setLearningObjectives,
  requirements,
  setRequirements,
  difficultyLevel,
  setDifficultyLevel,
  language,
  setLanguage,
  handleCancel,
  handleSubmit
}) => {
  
  return (
    <div className="w-full max-w-[800px] flex flex-col bg-base-100 shadow-md rounded-md p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-3xl text-white font-bold mb-6">
          Add New Course Details
        </h2>
        <button className="btn btn-neutral btn-sm" onClick={() => setFormNumber(1)}><IoIosArrowBack /></button>
      </div>
      <button className="btn btn-primary btn-sm" onClick={handleFechCourseDetail}>
        {mutation2.isLoading ? "Loading..." : "Fill by AI"} <FaRobot />
      </button>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="md:w-1/2">
            {/* Course Overview */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Course Overview</span>
              </label>
              <textarea
                value={courseOverview}
                onChange={(e) => setCourseOverview(e.target.value)}
                placeholder="Enter course overview"
                className="textarea textarea-bordered w-full"
                rows="4"
              ></textarea>
            </div>

            {/* What You'll Learn */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">What You'll Learn</span>
              </label>
              <textarea
                value={learningObjectives}
                onChange={(e) => setLearningObjectives(e.target.value)}
                placeholder="List the learning objectives, separate by commas"
                className="textarea textarea-bordered w-full"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="md:w-1/2">
            {/* Requirements */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Requirements</span>
              </label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="List the course requirements, separate by commas"
                className="textarea textarea-bordered w-full"
                rows="2"
              ></textarea>
            </div>
            {/* Difficulty Level */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Difficulty Level</span>
              </label>
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value={"beginner"}>
                  Beginner
                </option>
                <option value={"intermediate"}>Intermediate</option>
                <option value={"advanced"}>Advanced</option>
              </select>
            </div>

            {/* Language */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Language</span>
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter course language"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {mutation2.isError && <p className="text-red-500">{mutation2.error.response.data.error}</p>}
        </div>
        {/* Submit Button */}
        <div className="form-control grid grid-cols-1 md:grid-cols-2  gap-3 mt-6">
          <button className="btn btn-error" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm2;
