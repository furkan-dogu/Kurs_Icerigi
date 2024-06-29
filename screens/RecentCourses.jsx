import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Courses from "../components/Courses";
import { useCoursesContext } from "../context/coursesContext";
import { getLastWeek } from "../helpers/date";

export default function RecentCourses() {
    const { courses } = useCoursesContext()
    const recentCourses = courses.filter((course) => {
        const today = new Date()
        const dateLastWeek = getLastWeek(today, 7)
        return course.date >= dateLastWeek && course.date <= today
    })
  return <Courses courses={recentCourses} coursesPeriod="Son 1 Hafta" nullText="Yakın zamanda herhangi bir kursa kaydolmadınız" />;
}

const styles = StyleSheet.create({});
