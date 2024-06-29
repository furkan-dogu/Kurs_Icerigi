import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CoursesSummary from "./CoursesSummary";
import CoursesList from "./CoursesList";

export default function Courses({ coursesPeriod, courses, nullText }) {
  return (
    <View style={styles.container}>
      <CoursesSummary courses={courses} periodName={coursesPeriod} />
      {courses.length ? (
        <CoursesList courses={courses} />
      ) : (
        <Text style={styles.alert}>{nullText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  alert: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});
