import React from "react";
import { useMutation } from "react-query";
import fetchPlaylistData from "../../services/fetchPlaylistData";

function AddCourseForm1({
  setShowCourseAddForm,
  published,
  setPublished,
  courseTitle,
  setCourseTitle,
  courseDescription,
  setCourseDescription,
  coursePrice,
  setCoursePrice,
  courseImage,
  setCourseImage,
  ytLink,
  setYtLink,
  setFormNumber,
  handleCancel,
}) {
  const mutation2 = useMutation({
    mutationFn: fetchPlaylistData,
    cacheTime: 1000 * 60 * 10,
    onSuccess: (data) => autoFillAllFiled(data.data),
    onError: (data) => console.log(data),
  });

  function autoFillAllFiled(data) {
    setPublished(false);
    setCourseTitle(`${data?.playlistTitle}`);
    setCourseDescription(`${data?.description}`);
    setCourseImage(`${data?.videos[0].thumbnail}`);
  }

  function handleAutoFill() {
    mutation2.mutate(ytLink);
  }

  return (
    <div className="w-full max-w-lg flex flex-col bg-base-100 shadow-md rounded-md p-6">
      <h2 className="text-xl md:text-3xl font-bold mb-6">Add New Course</h2>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Yt Playlist Link</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={ytLink}
            onChange={(e) => setYtLink(e.target.value)}
            placeholder="Enter youtube playlist link here.."
            className="input input-bordered w-full"
          />
          <button
            onClick={handleAutoFill}
            className="btn btn-primary btn-outline btn-sm"
          >
            {mutation2.isLoading ? "Loading..." : "Autofill"}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Course Title */}
        <div className="form-control mb-4 w-full md:w-[60%]">
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

        {/* Published Checkbox */}
        <div className="form-control mb-4 md:mb-0">
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

      {/* Submit Button */}
      <div className="form-control grid grid-cols-1 md:grid-cols-2  gap-3 mt-6">
        <button className="btn btn-error" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => setFormNumber(2)}>
          Next
        </button>
      </div>
    </div>
  );
}
export default AddCourseForm1;
