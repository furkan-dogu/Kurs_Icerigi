import { StyleSheet, View } from "react-native";
import { useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useCoursesContext } from "../context/coursesContext";
import CourseForm from "../components/CourseForm";

export default function ManageCourse({ route, navigation }) {
  const courseId = route.params?.courseId;
  let isEditing = false;
  const { deleteCourse, updateCourse, addCourse, courses } = useCoursesContext();

  const selectedCourse = courses.find((course) => course.id === courseId)

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Kursu Güncelle" : "Kurs Ekle",
    });
  }, [navigation, isEditing]);

  const handleDelete = () => {
    deleteCourse(courseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddOrUpdate = (courseData) => {
    if (isEditing) {
      updateCourse(courseId, courseData);
    } else {
      addCourse(courseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CourseForm
        handleCancel={handleCancel}
        onSubmit={handleAddOrUpdate}
        buttonLabel={isEditing ? "Güncelle" : "Ekle"}
        defaultValues={selectedCourse}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <EvilIcons
            name="trash"
            size={36}
            color="black"
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  deleteContainer: {
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "blue",
    paddingTop: 10,
    marginTop: 16,
  },
});
