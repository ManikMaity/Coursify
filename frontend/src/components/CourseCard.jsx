/* eslint-disable react/prop-types */
import React from 'react'
import { useMutation } from 'react-query'
import addToPurchase from '../services/addToPurchase'

// eslint-disable-next-line react/prop-types
function CourseCard({course, purchased = false}) {

  const mutation = useMutation(addToPurchase, {
    onSuccess : (data) => {
      console.log(data);
    },
    onError : (data) => {
      console.log(data);
    }
  });

function handleEnroll (){
  mutation.mutate(course._id);
}

  return (
    <div key={course?.id} className="card bg-base-100 shadow-lg">
            <figure>
              <img src={course?.imageLink} alt={course?.title} className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-bold text-neutral-content">{course?.title}</h3>
              <p className="text-neutral-content">{course?.description}</p>
              {purchased ? <div className="flex justify-between items-center mt-4">
                <button className="btn btn-primary">Strat Course</button>
              </div> :<div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-primary">Price: ${course?.price}</span>
                <button onClick={handleEnroll} className="btn btn-primary">{mutation.isLoading ? "Enrolling.." :"Enroll Now"}</button>
              </div>}
            </div>
          </div>
  )
}

export default CourseCard
