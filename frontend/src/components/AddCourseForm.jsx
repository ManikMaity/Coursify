import React, { useState } from "react";
import AddCourseForm1 from "./admin/AddCourseForm1";
import AddCourseForm2 from "./admin/AddCourseForm2";
import { useMutation } from "react-query";
import addNewCourse from "../services/addNewCourse";
import { fetchCourseDetail } from "../services/fetchCourseDetail";

const AddCourseForm = ({ setShowCourseAddForm, showCourseAddForm, refetch }) => {
  const [formNumber, setFormNumber] = useState(1);
  const [published, setPublished] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseImage, setCourseImage] = useState("");
  const [ytLink, setYtLink] = useState("");
  const [courseOverview, setCourseOverview] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [requirements, setRequirements] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("beginner");
  const [language, setLanguage] = useState("");


  function resetAllData(){
    setPublished(false);
    setCourseTitle("");
    setCourseDescription("");
    setCoursePrice(0);
    setCourseImage("");
    setYtLink("");
    setCourseOverview("");
    setLearningObjectives("");
    setRequirements("");
    setDifficultyLevel("beginner");
    setLanguage("");
  }

  const mutation = useMutation(addNewCourse, {
    onSuccess : async(data) => {
      resetAllData();
      setFormNumber(1);
      setShowCourseAddForm(false);
      await refetch();
    },
    onError : (error) => {
      console.log(error);
    }
  });

  const mutation2 = useMutation(fetchCourseDetail, {
    onSuccess : (data) => {
      const courseData = data.data;
      setCourseOverview(courseData.CourseOverview);
      setLearningObjectives(courseData.LearningObjectives.join(", "));
      setLanguage(courseData.Language);
      setRequirements(courseData.Requirements)
    },
    onError : (error) => {
      console.log(error);
    }
  })

  function handleFechCourseDetail() {
    if (courseTitle.trim() == ""  || courseDescription.trim() == "") return;
    mutation2.mutate({
      title: courseTitle,
      description : courseDescription
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({
      title: courseTitle,
      description: courseDescription,
      price: Number(coursePrice),
      imageLink: courseImage,
      published,
      ytPlaylistLink : ytLink,
      CourseOverview : courseOverview,
      LearningObjectives : learningObjectives.split(", "),
      Requirements : requirements,
      Language : language,
      DifficultyLevel : difficultyLevel
    });
  }

  function handleCancel() {
    resetAllData();
    setShowCourseAddForm(false);
  }


  return (
    <div className="bg-[#1b1b1bb7] flex items-center absolute top-0 z-50 right-0 min-h-screen w-screen  justify-center p-6">
      {(formNumber === 1 && showCourseAddForm) && <AddCourseForm1
        setShowCourseAddForm={setShowCourseAddForm}
        published={published}
        setPublished={setPublished}
        courseTitle={courseTitle}
        setCourseTitle={setCourseTitle}
        courseDescription={courseDescription}
        setCourseDescription={setCourseDescription}
        coursePrice={coursePrice}
        setCoursePrice={setCoursePrice}
        courseImage={courseImage}
        setCourseImage={setCourseImage}
        ytLink={ytLink}
        setYtLink={setYtLink}
        setFormNumber={setFormNumber}
        handleCancel={handleCancel}
      />}
      {(formNumber === 2 && showCourseAddForm) && (
        <AddCourseForm2
        courseOverview={courseOverview}
        setCourseOverview={setCourseOverview}
        learningObjectives={learningObjectives}
        setLearningObjectives={setLearningObjectives}
        requirements={requirements}
        setRequirements={setRequirements}
        difficultyLevel={difficultyLevel}
        setDifficultyLevel={setDifficultyLevel}
        language={language}
        setLanguage={setLanguage}
        setFormNumber={setFormNumber}
        handleCancel={handleCancel}
        handleFechCourseDetail={handleFechCourseDetail}
        mutation2={mutation2}
        handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddCourseForm;
