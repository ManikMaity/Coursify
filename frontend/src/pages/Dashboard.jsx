import React from 'react'
import AddCourseForm from '../components/AddCourseForm';

const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Introduction to React, covering basic concepts.",
      price: 100,
      imageLink: "https://via.placeholder.com/150",
      published: true,
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      description: "Learn advanced JavaScript concepts and ES6 features.",
      price: 150,
      imageLink: "https://via.placeholder.com/150",
      published: false,
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Basics of UI/UX design and how to enhance user experience.",
      price: 200,
      imageLink: "https://via.placeholder.com/150",
      published: true,
    },
  ];

function Dashboard() {

    return (
        <>
        <AddCourseForm/>
      <div className="bg-base-200 min-h-screen p-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-neutral-content">Admin Dashboard</h1>
          <p className="text-lg text-neutral-content">Manage courses, edit, and view all available courses.</p>
        </div>
  
        {/* Add New Course Button */}
        <div className="flex justify-end mb-4">
          <button className="btn btn-primary">Add New Course</button>
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
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <th>{index + 1}</th>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>${course.price}</td>
                  <td>
                    {course.published ? (
                      <span className="badge badge-success">Published</span>
                    ) : (
                      <span className="badge badge-warning">Unpublished</span>
                    )}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-info">Edit</button>
                      <button className="btn btn-sm btn-error">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>

    );
  };
export default Dashboard
