import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CourseItem from "./CourseItem";

const renderCourseItem = (data) => {
  return <CourseItem {...data.item} />;
};

export default function CoursesList({ courses }) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={renderCourseItem}
    />
  );
}

const styles = StyleSheet.create({});
