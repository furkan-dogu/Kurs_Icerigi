import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useCoursesContext } from "../context/coursesContext";
import CourseForm from "../components/CourseForm";

export default function ManageCourse({ route, navigation }) {
  const courseId = route.params?.courseId;
  let isEditing = false;
  const { deleteCourse, updateCourse, addCourse } = useCoursesContext();

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

  const handleAddOrUpdate = () => {
    if (isEditing) {
      updateCourse(courseId, {
        description: "Güncellenen Kurs",
        amount: 169,
        date: new Date(),
      });
    } else {
      addCourse({
        description: "Eklenen Kurs",
        amount: 169,
        date: new Date(),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CourseForm />
      <View style={styles.buttons}>
        <Pressable onPress={handleCancel}>
          <View style={[styles.button, styles.cancel]}>
            <Text style={styles.buttonText}>İptal Et</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleAddOrUpdate}>
          <View style={[styles.button, styles.addOrDelete]}>
            <Text style={styles.buttonText}>
              {isEditing ? "Güncelle" : "Ekle"}
            </Text>
          </View>
        </Pressable>
      </View>

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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    minWidth: 120,
    padding: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  cancel: {
    backgroundColor: "red",
  },
  addOrDelete: {
    backgroundColor: "blue",
  },
});
