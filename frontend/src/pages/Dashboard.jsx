import React, { useState } from "react";
import { useQuery } from "react-query";
import fetchAdminData from "../services/fetchAdminData";
import { useNavigate } from "react-router-dom";
import fetchAdminCourses from "../services/fetchAdminCourses";
import AddCourseForm from "../components/AddCourseForm";
import CourseTableRow from "../components/admin/CourseTableRow";
import { makeTextShorter } from "../util/util";
import { FaPlus } from "react-icons/fa";


function Dashboard() {



  const navigator = useNavigate();
  const [showCourseAddForm, setShowCourseAddForm] = useState(false)

  const { data, isLoading, isError } = useQuery(
    ["admin"],
    fetchAdminData,
    {
      staleTime: 60 * 1000 * 10,
      cacheTime: 60 * 1000 * 10,
    }
  );

  const {data : courseData, isLoading : isCourseLoading, isError : isCourseError, isFetched : isCourseFetched, refetch} = useQuery(["uploadedCourses"], fetchAdminCourses, {
    staleTime : 10*60*1000,
    cacheTime : 1000*60*10
  })

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <div className="w-full rounded-lg h-96 skeleton"></div>
      </div>
    );
  }

  if (isError) {
    navigator("/admin/signup");
  }

  return (
    <>
    <div className="flex flex-col lg:flex-row bg-base-200 min-h-screen">
      {showCourseAddForm && <AddCourseForm refetch={refetch} showCourseAddForm={showCourseAddForm} setShowCourseAddForm={setShowCourseAddForm}/>}
      {/* User Profile Sidebar */}
      <aside className="w-full lg:w-1/4 bg-base-100 shadow-lg p-4 flex flex-col items-center">
        <img
          src={data?.data.profileImageLink}
          alt="User Profile"
          className="rounded-full h-24 w-24 object-cover mb-4"
        />
        <h2 className="text-2xl font-bold text-center">{data?.data.username}</h2>
        <p className="text-sm text-center text-gray-500">{data?.data.role}</p>
        <p className="mt-2 text-center">{makeTextShorter(data?.data.description, 200)}</p>
        <a
          href={data?.data.socialLink}
          className="mt-4 text-primary text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my social profile
        </a>
        <button className="btn btn-primary mt-4 w-full">Edit Profile</button>
        <button className="btn btn-error btn-outline mt-4 w-full" onClick={() => {
          const sure = confirm("Are you sure?");
          if (sure){
            localStorage.removeItem("admintoken");
            location.reload();
          }
          }}>Logout</button>
      </aside>

      {/* Dashboard Main Content */}
      {isError && <main className="w-full lg:w-3/4 p-6">Error</main>}
      {(isCourseLoading || isCourseError) && <main className="w-full lg:w-3/4 p-6 h-80 skeleton"></main>}
      {isCourseFetched && <main className="w-full lg:w-3/4 p-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-neutral-content">
            Admin Dashboard
          </h1>
          <p className="text-lg text-neutral-content">
            Manage courses, edit, and view all available courses.
          </p>
        </div>

        {/* Add New Course Button */}
        <div className="flex justify-end mb-4">
          <button className="btn btn-primary" onClick={() => setShowCourseAddForm(!showCourseAddForm)}>Add New Course <FaPlus /></button>
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseData?.data.map((course, index) => (
                <CourseTableRow refetch={refetch} key={course._id} course={course} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </main>}
    </div>
    </>
  );
}

export default Dashboard;
