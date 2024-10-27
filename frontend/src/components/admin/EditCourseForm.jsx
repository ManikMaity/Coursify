import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import updateCourse from "../../services/updateCourse";

const EditCourseForm = ({ currentCourse, setShowEditForm, refetch }) => {

  const [published, setPublished] = useState(currentCourse.published);
  const [courseTitle, setCourseTitle] = useState(currentCourse.title);
  const [courseDescription, setCourseDescription] = useState(currentCourse.description);
  const [coursePrice, setCoursePrice] = useState(currentCourse.price);
  const [courseImage, setCourseImage] = useState(currentCourse.imageLink);

  const mutation = useMutation(updateCourse, {
    onSuccess: async (data) => {
      setShowEditForm(false);
      await refetch();
    },
  });


  function handleSubmit() {
    mutation.mutate({
      id: currentCourse._id, // Assuming course ID is passed to identify the course
      title: courseTitle,
      description: courseDescription,
      price: Number(coursePrice),
      imageLink: courseImage,
      published,
    });
  }

  function handleCancel() {
    setShowEditForm(false);
  }

  return (
    <div className="bg-[#1b1b1bb7] flex items-center fixed top-0 z-50 right-0 min-h-screen w-screen  justify-center p-6">
      <div className="w-full max-w-lg flex flex-col bg-base-100 shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>

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

        <div className="flex flex-row justify-between gap-4">
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

        {/* Action Buttons */}
        <div className="form-control grid grid-cols-2 gap-3 mt-6">
          <button className="btn btn-error" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            {mutation.isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseForm;
