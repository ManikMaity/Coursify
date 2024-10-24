import React, { useState } from "react";
import AddCourseForm1 from "./admin/AddCourseForm1";
import AddCourseForm2 from "./admin/AddCourseForm2";

const AddCourseForm = ({setShowCourseAddForm, refetch}) => {
const [showAddCourseForm2, setShowAddCourseForm2] = useState(true);

  return (
    <div className="bg-[#1b1b1bb7] flex items-center absolute top-0 z-50 right-0 min-h-screen w-screen  justify-center p-6">
      {/* <AddCourseForm1 setShowCourseAddForm={setShowCourseAddForm} refetch={refetch}/> */}
      {showAddCourseForm2 && <AddCourseForm2 setShowAddCourseForm2={setShowAddCourseForm2} />}
    </div>
  );
};

export default AddCourseForm;
