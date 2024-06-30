import { useEffect, useState } from "react";
import Courses from "../components/Courses";
import { useCoursesContext } from "../context/coursesContext";
import { getLastWeek } from "../helpers/date";
import { getCourses } from "../helpers/http";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RecentCourses() {
  const { setCourse, courses } = useCoursesContext();
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const takeCourses = async () => {
      setIsFetching(true)
      const data = await getCourses()
      setCourse(data)
      setIsFetching(false)
    }

    takeCourses()
  }, [])

  if(isFetching) {
    return <LoadingSpinner />
  }
  
  const recentCourses = courses.filter((course) => {
    const today = new Date();
    const dateLastWeek = getLastWeek(today, 7);
    return course.date >= dateLastWeek && course.date <= today;
  });

  return (
    <Courses
      courses={recentCourses}
      coursesPeriod="Son 1 Hafta"
      nullText="Yakın zamanda herhangi bir kursa kaydolmadınız"
    />
  );
}