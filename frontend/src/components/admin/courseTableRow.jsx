import React from 'react'
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'
import { makeTextShorter } from '../../util/util'

function courseTableRow({course, index}) {
  return (
    <tr key={course.id}>
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
        <button className="btn btn-sm btn-info flex flex-nowrap">
          <FaUserEdit className="mr-1" /> Edit
        </button>
        <button className="btn btn-sm btn-error flex flex-nowrap">
          <FaTrashAlt className="mr-1" /> Delete
        </button>
      </div>
    </td>
  </tr>
  )
}

export default courseTableRow
