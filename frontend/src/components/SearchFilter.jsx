import React, { useState } from "react";

function SearchFilter({filterData, refetch}) {

  const {
    difficulty,
    setDifficulty,
    duration,
    setDuration,
    language,
    setLanguage,
    free,
    setFree,
  } = filterData;

  function handleClearFilter (){
    setDifficulty("");
    setDuration("");
    setLanguage("");
    setFree(false);
  }



  return (
    <div className="md:col-span-1 bg-base-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Filters</h2>

      {/* Category Filter */}
      {/* <div className="mb-4">
      <label className="block text-md font-semibold text-white mb-2">Category</label>
      <select className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary">
        <option>All Categories</option>
        <option>Web Development</option>
        <option>Data Science</option>
        <option>Machine Learning</option>
        <option>Marketing</option>
      </select>
    </div> */}

      {/* Difficulty Filter */}
      <div className="mb-4">
        <label className="block text-md font-semibold text-white mb-2">
          Difficulty
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={""}>All Levels</option>
          <option value={"beginner"}>Beginner</option>
          <option value={"intermediate"}>Intermediate</option>
          <option value={"advanced"}>Advanced</option>
        </select>
      </div>

      {/* Duration Filter */}
      <div className="mb-4">
        <label className="block text-md font-semibold text-white mb-2">
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={""}>All Durations</option>
          <option value={"<1"}>Less than 1 hour</option>
          <option value={"1-3"}>1-3 hours</option>
          <option value={"3-6"}>3-6 hours</option>
          <option value={">6"}>More than 6 hours</option>
        </select>
      </div>

      {/* Language Filter */}
      <div className="mb-4">
        <label className="block text-md font-semibold text-white mb-2">
          Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={""}>All Languages</option>
          <option value={"english"}>English</option>
          <option value={"hindi"}>Hindi</option>
          <option value={"bengali"}>Bengali</option>
        </select>
      </div>

      {/* Additional Filters */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Additional Filters
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              value={free}
              onChange={() => setFree(!free)}
              id="free"
              className="checkbox checkbox-primary"
            />
            <label htmlFor="free" className="ml-2 text-neutral-content">
              Free Courses
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-start mt-4">
        <button className="btn btn-outline btn-error" onClick={handleClearFilter}>Clear Filters</button>
        <button className="btn btn-primary ml-4" onClick={() => refetch()}>Apply Filters</button>
      </div>
    </div>
  );
}

export default SearchFilter;
