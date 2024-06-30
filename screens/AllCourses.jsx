import React from "react";
import Courses from "../components/Courses";
import { useCoursesContext } from "../context/coursesContext";

export default function AllCourses() {
  const {courses} = useCoursesContext()
  return <Courses courses={courses} coursesPeriod="Hepsi" nullText="Herhangi bir kursa kayıtlı değilsiniz" />;
}