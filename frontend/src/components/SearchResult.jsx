import React from 'react'

function SearchResult() {
  return (
    <div className="md:col-span-3">
    <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Course Cards */}
      <div className="bg-base-100 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white">React Basics</h3>
        <p className="text-sm text-neutral-content">Duration: 12 hours</p>
        <a
          href="#"
          className="btn btn-outline btn-primary mt-2"
        >
          View Course
        </a>
      </div>
      <div className="bg-base-100 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white">Advanced JavaScript</h3>
        <p className="text-sm text-neutral-content">Duration: 8 hours</p>
        <a
          href="#"
          className="btn btn-outline btn-primary mt-2"
        >
          View Course
        </a>
      </div>
      <div className="bg-base-100 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white">UI/UX Design</h3>
        <p className="text-sm text-neutral-content">Duration: 5 hours</p>
        <a
          href="#"
          className="btn btn-outline btn-primary mt-2"
        >
          View Course
        </a>
      </div>
      {/* Additional Course Cards can be added similarly */}
    </div>
  </div>
  )
}

export default SearchResult
