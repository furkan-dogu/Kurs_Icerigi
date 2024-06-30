import { StyleSheet, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useCoursesContext } from "../context/coursesContext";
import CourseForm from "../components/CourseForm";
import { destroyedCourse, editCourse, storeCourse } from "../helpers/http";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ManageCourse({ route, navigation }) {
  const [isSubmiting, setIsSubmiting] = useState(false)
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

  const handleDelete = async () => {
    setIsSubmiting(true)
    deleteCourse(courseId);
    await destroyedCourse(courseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddOrUpdate = async (courseData) => {
    setIsSubmiting(true)
    if (isEditing) {
      updateCourse(courseId, courseData);
      await editCourse(courseId, courseData);
    } else {
      const id = await storeCourse(courseData)
      addCourse({...courseData, id: id});
    }
    navigation.goBack();
  };

  if(isSubmiting) {
    return <LoadingSpinner />
  }

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
