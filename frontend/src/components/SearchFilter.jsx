import React from 'react'

function SearchFilter() {
  return (
    <div className="md:col-span-1 bg-base-100 p-4 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-white mb-4">Filters</h2>
    
    {/* Category Filter */}
    <div className="mb-4">
      <label className="block text-md font-semibold text-white mb-2">Category</label>
      <select className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary">
        <option>All Categories</option>
        <option>Web Development</option>
        <option>Data Science</option>
        <option>Machine Learning</option>
        <option>Marketing</option>
      </select>
    </div>

    {/* Difficulty Filter */}
    <div className="mb-4">
      <label className="block text-md font-semibold text-white mb-2">Difficulty</label>
      <select className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary">
        <option>All Levels</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
    </div>

    {/* Duration Filter */}
    <div className="mb-4">
      <label className="block text-md font-semibold text-white mb-2">Duration</label>
      <select className="select select-bordered w-full bg-base-200 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary">
        <option>All Durations</option>
        <option>Less than 1 hour</option>
        <option>1-3 hours</option>
        <option>3-6 hours</option>
        <option>More than 6 hours</option>
      </select>
    </div>

    {/* Additional Filters */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">Additional Filters</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <input type="checkbox" id="free" className="checkbox checkbox-primary" />
          <label htmlFor="free" className="ml-2 text-neutral-content">Free Courses</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="certificate" className="checkbox checkbox-primary" />
          <label htmlFor="certificate" className="ml-2 text-neutral-content">Certificate Available</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="popular" className="checkbox checkbox-primary" />
          <label htmlFor="popular" className="ml-2 text-neutral-content">Most Popular</label>
        </div>
      </div>
    </div>

    {/* Clear Filters Button */}
    <div className="flex justify-start mt-4">
      <button className="btn btn-outline btn-error">Clear Filters</button>
    </div>
  </div>

  )
}

export default SearchFilter
