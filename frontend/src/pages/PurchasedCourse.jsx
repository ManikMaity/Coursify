import React from 'react'
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { useQuery } from 'react-query';
import fetchPurchaseCourse from '../services/fetchPurchaseCourse';

function PurchasedCourse() {

    const {data, isLoading, isFetched, isError} = useQuery(["purchasedCourses"], fetchPurchaseCourse, {
        staleTime : 60*1000*10,
        cacheTime : 60*1000*10
    })

    if (isLoading || isError){
        return <div className='mx-auto mt-10 w-[90%] h-[100px] skeleton'></div>
    }


    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200 p-0">

        <Header/>
       {(isFetched && data) && <>
          <h2 className="text-3xl font-bold text-neutral-content my-6">Purchased Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
            {data.data.map(course => <CourseCard key={course._id} purchased={true} course={course}/>)}
          </div>
        </>}
        </div>
      );
}

export default PurchasedCourse
