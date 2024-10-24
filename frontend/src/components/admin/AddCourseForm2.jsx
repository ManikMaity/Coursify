import React, { useState } from "react";

const AddCourseForm2 = () => {
  const [courseOverview, setCourseOverview] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [requirements, setRequirements] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("beginner");
  const [language, setLanguage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
  };

  return (
    <div className="w-full max-w-lg flex flex-col bg-base-100 shadow-md rounded-md p-6">
      <h2 className="text-3xl text-white font-bold mb-6">
        Add New Course Details
      </h2>
      <form onSubmit={handleSubmit}>


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
          <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} className="select select-bordered w-full">
            <option value={"beginner"} selected>Beginner</option>
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

        {/* Submit Button */}
        <div className="form-control grid grid-cols-1 md:grid-cols-2  gap-3 mt-6">
        <button className="btn btn-error" >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm2;
