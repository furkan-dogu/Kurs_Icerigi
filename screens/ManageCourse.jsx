import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function ManageCourse({ route, navigation }) {
  const courseId = route.params?.courseId;
  let isEditing = false;

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Kursu Güncelle" : "Kurs Ekle",
    });
  }, [navigation, isEditing]);

  const deleteCourse = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable onPress={handleCancel}>
          <View style={[styles.button, styles.cancel]}>
            <Text style={styles.buttonText}>İptal Et</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={[styles.button, styles.addOrDelete]}>
            <Text style={styles.buttonText}>{isEditing ? "Güncelle" : "Ekle"}</Text>
          </View>
        </Pressable>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <EvilIcons
            name="trash"
            size={36}
            color="black"
            onPress={deleteCourse}
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
    gap: 10
  },
  button: {
    minWidth: 120,
    padding: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  },
  cancel: {
    backgroundColor: "red",
  },
  addOrDelete: {
    backgroundColor: "blue",
  },
});
