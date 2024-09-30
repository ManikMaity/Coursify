import React, { useState } from "react";
import { useMutation } from "react-query";
import addNewCourse from "../services/addNewCourse";

const AddCourseForm = ({setFetchCourses, fetchCourses, setShowCourseAddForm }) => {
  const [published, setPublished] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseImage, setCourseImage] = useState("");

  const mutation = useMutation(addNewCourse, {
    onSuccess : (data) => {
      setFetchCourses(fetchCourses + 1);
      setPublished(false);
      setCourseTitle("");
      setCourseDescription("");
      setCoursePrice(0);
      setCourseImage("");
      setShowCourseAddForm(false);
    }
  });

  function handleSubmit() {
    mutation.mutate({
      title: courseTitle,
      description: courseDescription,
      price: Number(coursePrice),
      imageLink: courseImage,
      published,
    });
  }

  function handleCancel() {
    setShowCourseAddForm(false);
  }

  return (
    <div className="bg-[#1b1b1bb7] flex items-center absolute top-0 z-20 right-0 min-h-screen w-screen  justify-center p-6">
      <div className="w-full max-w-lg flex flex-col bg-base-100 shadow-md rounded-md p-6">
        <h2 className="text-3xl font-bold mb-6">Add New Course</h2>

        {/* Course Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Course Title</span>
          </label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Course Description */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Course Description</span>
          </label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Enter course description"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div className="flex flex-row justify-between gap-3">
          {/* Course Price */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Price (in USD)</span>
            </label>
            <input
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              min={0}
              type="number"
              placeholder="Enter course price"
              className="input input-bordered w-full"
            />
          </div>

          {/* Image URL */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              value={courseImage}
              onChange={(e) => setCourseImage(e.target.value)}
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Published Checkbox */}
        <div className="form-control mb-6">
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={published}
              onChange={() => setPublished(!published)}
            />
            <span className="ml-2">Publish Course</span>
          </label>
        </div>
        {mutation.isError && (
            <p className="text-red-500">{mutation.error.response.data.error}</p>
          )}

        {/* Submit Button */}
        <div className="form-control grid grid-cols-1 md:grid-cols-2  gap-3 mt-6">
        <button className="btn btn-error" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {mutation.isLoading ? "Submiting.." : "Submit"}
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;
