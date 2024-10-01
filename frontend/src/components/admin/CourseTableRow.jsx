import React, { useState } from 'react'
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'
import { makeTextShorter } from '../../util/util'
import { useMutation } from 'react-query';
import deleteCourse from '../../services/deleteCourse';
import EditCourseForm from './EditCourseForm';

function CourseTableRow({course, index, refetch}) {

  const [showEditForm, setShowEditForm] = useState(false);


  const mutation = useMutation(deleteCourse, {
    onSuccess : async (data) => {
      await refetch();
      console.log(data, "Course is deleted");
    },
    onError : (data) => {
      console.log(data, "Course is not deleted");
    }
  })





  function handleDelete() {
    const id = course._id;
    const sure = confirm("Are you sure?");
    if (sure){
      mutation.mutate(`${id}`);
    }
  }


  return (
    <>
    {showEditForm && <EditCourseForm currentCourse={course} setShowEditForm={setShowEditForm} refetch={refetch}/>}
    <tr key={course._id}>
    <th>{index + 1}</th>
    <td>{course.title}</td>
    <td className="whitespace-normal break-words max-w-xs">
      {makeTextShorter(course.description, 70)}
    </td>
    <td>${course.price}</td>
    <td>
      {course.published ? (
        <span className="badge badge-success">Published</span>
      ) : (
        <span className="badge badge-warning">Unpublished</span>
      )}
    </td>
    <td>
      <div className="flex md:flex-row flex-col gap-2 space-x-2">
        <button onClick={() => setShowEditForm(true)} className="btn btn-sm btn-info flex flex-nowrap">
          <FaUserEdit className="mr-1" /> Edit
        </button>
        <button onClick={handleDelete} className="btn btn-sm  btn-error flex flex-nowrap">
          <FaTrashAlt className="mr-1"/> {mutation.isLoading ? "Deleting.." :"Delete"}
        </button>
      </div>
    </td>
  </tr>
  </>
  )
}

export default CourseTableRow
