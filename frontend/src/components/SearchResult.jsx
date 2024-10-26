import React from 'react'
import CourseCard from "./CourseCard";

function SearchResult({coursesData}) {
  return (
    <div className="md:col-span-3">
    <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Course Cards */}
      {coursesData.map(course => <CourseCard key={course._id} course={course}/>)}
      {/* Additional Course Cards can be added similarly */}
    </div>
  </div>
  )
}

export default SearchResult
